// This function is meant to be deployed to Supabase Edge Functions
// It's currently set up to work in the local development environment

import { createClient } from '@supabase/supabase-js';

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// This function will be converted to Deno syntax when deployed to Supabase
export async function handleRequest(req: Request) {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Fetch Supabase URL and Anon Key from environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing Supabase environment variables");
    }

    // Create a Supabase client
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: req.headers.get("Authorization") || "" },
      },
    });

    // Get the user ID from the request body
    const { user_id } = await req.json();

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: "User ID is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Get user's Google access token from Supabase
    const { data: authData, error: authError } = await supabaseClient.auth.admin.getUserById(user_id);

    if (authError || !authData) {
      console.error("Error getting user:", authError);
      return new Response(
        JSON.stringify({ error: "Failed to get user authentication data" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Extract Google tokens
    const googleToken = authData.user.app_metadata.provider_token;

    if (!googleToken) {
      return new Response(
        JSON.stringify({ error: "Google account not connected or token expired" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // In a real implementation, you would use the Google token to fetch emails
    // containing receipts, parse them, and store them in Supabase.
    // For this example, we'll simulate finding 3 new receipts.

    const mockReceipts = [
      {
        user_id,
        vendor: "Amazon",
        amount: 67.99,
        date: new Date().toISOString(),
        status: "processed",
        subject: "Your Amazon.com order has shipped",
      },
      {
        user_id,
        vendor: "Netflix",
        amount: 15.99,
        date: new Date().toISOString(),
        status: "processed",
        subject: "Your Netflix invoice",
      },
      {
        user_id,
        vendor: "Uber",
        amount: 24.50,
        date: new Date().toISOString(),
        status: "pending",
        subject: "Your Uber receipt",
      },
    ];

    // Store mock receipts in Supabase
    const { data, error } = await supabaseClient
      .from("receipts")
      .insert(mockReceipts);

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        count: mockReceipts.length,
        message: `${mockReceipts.length} new receipts found and saved`,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error processing request:", error);

    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
}

// For local development, we'll export this function
// When deploying to Supabase, this will be replaced with the Deno serve handler
export default handleRequest;

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      admin_actions: {
        Row: {
          action: string;
          actor_id: string;
          created_at: string;
          diff: Json | null;
          id: string;
          target_id: string | null;
          target_table: string;
        };
        Insert: {
          action: string;
          actor_id: string;
          created_at?: string;
          diff?: Json | null;
          id?: string;
          target_id?: string | null;
          target_table: string;
        };
        Update: {
          action?: string;
          actor_id?: string;
          created_at?: string;
          diff?: Json | null;
          id?: string;
          target_id?: string | null;
          target_table?: string;
        };
        Relationships: [
          {
            foreignKeyName: "admin_actions_actor_id_fkey";
            columns: ["actor_id"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["user_id"];
          },
        ];
      };
      admin_users: {
        Row: {
          disabled_at: string | null;
          invited_at: string;
          invited_by: string | null;
          last_login_at: string | null;
          role: Database["public"]["Enums"]["admin_role"];
          user_id: string;
        };
        Insert: {
          disabled_at?: string | null;
          invited_at?: string;
          invited_by?: string | null;
          last_login_at?: string | null;
          role?: Database["public"]["Enums"]["admin_role"];
          user_id: string;
        };
        Update: {
          disabled_at?: string | null;
          invited_at?: string;
          invited_by?: string | null;
          last_login_at?: string | null;
          role?: Database["public"]["Enums"]["admin_role"];
          user_id?: string;
        };
        Relationships: [];
      };
      application_events: {
        Row: {
          actor_user_id: string | null;
          application_id: string;
          created_at: string;
          event_type: string;
          id: string;
          payload: Json;
          workspace_id: string;
        };
        Insert: {
          actor_user_id?: string | null;
          application_id: string;
          created_at?: string;
          event_type: string;
          id?: string;
          payload: Json;
          workspace_id: string;
        };
        Update: {
          actor_user_id?: string | null;
          application_id?: string;
          created_at?: string;
          event_type?: string;
          id?: string;
          payload?: Json;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "application_events_application_id_fkey";
            columns: ["application_id"];
            isOneToOne: false;
            referencedRelation: "applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "application_events_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      applications: {
        Row: {
          auto_submitted: boolean;
          company_match_id: string | null;
          created_at: string;
          decision_at: string | null;
          deleted_at: string | null;
          id: string;
          notes: string | null;
          program_id: string;
          screening_result_id: string | null;
          status: string;
          submitted_at: string | null;
          updated_at: string;
          workspace_id: string;
        };
        Insert: {
          auto_submitted?: boolean;
          company_match_id?: string | null;
          created_at?: string;
          decision_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          notes?: string | null;
          program_id: string;
          screening_result_id?: string | null;
          status?: string;
          submitted_at?: string | null;
          updated_at?: string;
          workspace_id: string;
        };
        Update: {
          auto_submitted?: boolean;
          company_match_id?: string | null;
          created_at?: string;
          decision_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          notes?: string | null;
          program_id?: string;
          screening_result_id?: string | null;
          status?: string;
          submitted_at?: string | null;
          updated_at?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "applications_company_match_id_fkey";
            columns: ["company_match_id"];
            isOneToOne: false;
            referencedRelation: "company_program_matches";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "applications_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "applications_screening_result_id_fkey";
            columns: ["screening_result_id"];
            isOneToOne: false;
            referencedRelation: "screening_results";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "applications_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      company_profiles: {
        Row: {
          annual_revenue: string | null;
          company_age: string | null;
          company_name: string | null;
          created_at: string;
          deleted_at: string | null;
          employee_count: string | null;
          exports_or_plans: boolean | null;
          has_clean_energy: boolean | null;
          has_rnd: boolean | null;
          id: string;
          industry: string | null;
          is_hiring: boolean | null;
          is_rural: boolean | null;
          ownership_demographics: string[] | null;
          rnd_percentage: number | null;
          scan_data: Json | null;
          state: string | null;
          updated_at: string;
          website_url: string | null;
          workspace_id: string;
        };
        Insert: {
          annual_revenue?: string | null;
          company_age?: string | null;
          company_name?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          employee_count?: string | null;
          exports_or_plans?: boolean | null;
          has_clean_energy?: boolean | null;
          has_rnd?: boolean | null;
          id?: string;
          industry?: string | null;
          is_hiring?: boolean | null;
          is_rural?: boolean | null;
          ownership_demographics?: string[] | null;
          rnd_percentage?: number | null;
          scan_data?: Json | null;
          state?: string | null;
          updated_at?: string;
          website_url?: string | null;
          workspace_id: string;
        };
        Update: {
          annual_revenue?: string | null;
          company_age?: string | null;
          company_name?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          employee_count?: string | null;
          exports_or_plans?: boolean | null;
          has_clean_energy?: boolean | null;
          has_rnd?: boolean | null;
          id?: string;
          industry?: string | null;
          is_hiring?: boolean | null;
          is_rural?: boolean | null;
          ownership_demographics?: string[] | null;
          rnd_percentage?: number | null;
          scan_data?: Json | null;
          state?: string | null;
          updated_at?: string;
          website_url?: string | null;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "company_profiles_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: true;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      company_program_matches: {
        Row: {
          company_id: string;
          confidence_score: number;
          created_at: string;
          eligibility_tier: string;
          estimated_value: string | null;
          id: string;
          notes: string | null;
          program_id: string;
          reasons: Json;
          status: string;
          updated_at: string;
          workspace_id: string;
        };
        Insert: {
          company_id: string;
          confidence_score: number;
          created_at?: string;
          eligibility_tier?: string;
          estimated_value?: string | null;
          id?: string;
          notes?: string | null;
          program_id: string;
          reasons: Json;
          status?: string;
          updated_at?: string;
          workspace_id: string;
        };
        Update: {
          company_id?: string;
          confidence_score?: number;
          created_at?: string;
          eligibility_tier?: string;
          estimated_value?: string | null;
          id?: string;
          notes?: string | null;
          program_id?: string;
          reasons?: Json;
          status?: string;
          updated_at?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "company_program_matches_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "company_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "company_program_matches_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "company_program_matches_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      consents: {
        Row: {
          consent_type: string;
          created_at: string;
          granted: boolean;
          id: string;
          ip_address: unknown;
          user_agent: string | null;
          user_id: string;
          version: string;
        };
        Insert: {
          consent_type: string;
          created_at?: string;
          granted: boolean;
          id?: string;
          ip_address?: unknown;
          user_agent?: string | null;
          user_id: string;
          version: string;
        };
        Update: {
          consent_type?: string;
          created_at?: string;
          granted?: boolean;
          id?: string;
          ip_address?: unknown;
          user_agent?: string | null;
          user_id?: string;
          version?: string;
        };
        Relationships: [];
      };
      data_export_requests: {
        Row: {
          delivered_at: string | null;
          download_url: string | null;
          expires_at: string | null;
          id: string;
          immediate: boolean;
          kind: Database["public"]["Enums"]["export_kind"];
          requested_at: string;
          status: Database["public"]["Enums"]["export_status"];
          user_id: string;
        };
        Insert: {
          delivered_at?: string | null;
          download_url?: string | null;
          expires_at?: string | null;
          id?: string;
          immediate?: boolean;
          kind: Database["public"]["Enums"]["export_kind"];
          requested_at?: string;
          status?: Database["public"]["Enums"]["export_status"];
          user_id: string;
        };
        Update: {
          delivered_at?: string | null;
          download_url?: string | null;
          expires_at?: string | null;
          id?: string;
          immediate?: boolean;
          kind?: Database["public"]["Enums"]["export_kind"];
          requested_at?: string;
          status?: Database["public"]["Enums"]["export_status"];
          user_id?: string;
        };
        Relationships: [];
      };
      documents: {
        Row: {
          byte_size: number | null;
          deleted_at: string | null;
          filename: string;
          id: string;
          mime_type: string | null;
          scan_error: string | null;
          scan_status: Database["public"]["Enums"]["document_scan_status"];
          scanned_at: string | null;
          storage_bucket: string;
          storage_path: string;
          tags: string[] | null;
          uploaded_at: string;
          uploaded_by_user_id: string;
          workspace_id: string;
        };
        Insert: {
          byte_size?: number | null;
          deleted_at?: string | null;
          filename: string;
          id?: string;
          mime_type?: string | null;
          scan_error?: string | null;
          scan_status?: Database["public"]["Enums"]["document_scan_status"];
          scanned_at?: string | null;
          storage_bucket?: string;
          storage_path: string;
          tags?: string[] | null;
          uploaded_at?: string;
          uploaded_by_user_id: string;
          workspace_id: string;
        };
        Update: {
          byte_size?: number | null;
          deleted_at?: string | null;
          filename?: string;
          id?: string;
          mime_type?: string | null;
          scan_error?: string | null;
          scan_status?: Database["public"]["Enums"]["document_scan_status"];
          scanned_at?: string | null;
          storage_bucket?: string;
          storage_path?: string;
          tags?: string[] | null;
          uploaded_at?: string;
          uploaded_by_user_id?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "documents_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      feature_flags: {
        Row: {
          created_at: string;
          description: string | null;
          enabled: boolean;
          name: string;
          payload: Json | null;
          rollout_percent: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          enabled?: boolean;
          name: string;
          payload?: Json | null;
          rollout_percent?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          enabled?: boolean;
          name?: string;
          payload?: Json | null;
          rollout_percent?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      invoices: {
        Row: {
          amount_due_cents: number;
          amount_paid_cents: number;
          created_at: string;
          currency: string;
          hosted_invoice_url: string | null;
          id: string;
          invoice_pdf_url: string | null;
          status: string;
          stripe_invoice_id: string;
          subscription_id: string;
          user_id: string | null;
        };
        Insert: {
          amount_due_cents: number;
          amount_paid_cents: number;
          created_at?: string;
          currency?: string;
          hosted_invoice_url?: string | null;
          id?: string;
          invoice_pdf_url?: string | null;
          status: string;
          stripe_invoice_id: string;
          subscription_id: string;
          user_id?: string | null;
        };
        Update: {
          amount_due_cents?: number;
          amount_paid_cents?: number;
          created_at?: string;
          currency?: string;
          hosted_invoice_url?: string | null;
          id?: string;
          invoice_pdf_url?: string | null;
          status?: string;
          stripe_invoice_id?: string;
          subscription_id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "invoices_subscription_id_fkey";
            columns: ["subscription_id"];
            isOneToOne: false;
            referencedRelation: "subscriptions";
            referencedColumns: ["id"];
          },
        ];
      };
      notifications: {
        Row: {
          body: string | null;
          created_at: string;
          id: string;
          link_url: string | null;
          payload: Json | null;
          read_at: string | null;
          title: string;
          type: string;
          user_id: string;
          workspace_id: string | null;
        };
        Insert: {
          body?: string | null;
          created_at?: string;
          id?: string;
          link_url?: string | null;
          payload?: Json | null;
          read_at?: string | null;
          title: string;
          type: string;
          user_id: string;
          workspace_id?: string | null;
        };
        Update: {
          body?: string | null;
          created_at?: string;
          id?: string;
          link_url?: string | null;
          payload?: Json | null;
          read_at?: string | null;
          title?: string;
          type?: string;
          user_id?: string;
          workspace_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      program_translations: {
        Row: {
          description: string | null;
          locale: string;
          name: string;
          plain_language_summary: string | null;
          program_id: string;
          seo_description: string | null;
          seo_title: string | null;
          updated_at: string;
        };
        Insert: {
          description?: string | null;
          locale: string;
          name: string;
          plain_language_summary?: string | null;
          program_id: string;
          seo_description?: string | null;
          seo_title?: string | null;
          updated_at?: string;
        };
        Update: {
          description?: string | null;
          locale?: string;
          name?: string;
          plain_language_summary?: string | null;
          program_id?: string;
          seo_description?: string | null;
          seo_title?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "program_translations_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      programs: {
        Row: {
          agency: string | null;
          application_url: string | null;
          category: string;
          cover_image: string | null;
          created_at: string;
          deadline_info: string | null;
          description: string | null;
          eligibility_criteria: Json;
          id: string;
          industries: string[] | null;
          last_reviewed_at: string | null;
          name: string;
          plain_language_summary: string | null;
          published_at: string | null;
          seo_description: string | null;
          seo_title: string | null;
          state: string | null;
          status: string;
          tier: string | null;
          track: string;
          typical_award: string | null;
          updated_at: string;
        };
        Insert: {
          agency?: string | null;
          application_url?: string | null;
          category: string;
          cover_image?: string | null;
          created_at?: string;
          deadline_info?: string | null;
          description?: string | null;
          eligibility_criteria: Json;
          id: string;
          industries?: string[] | null;
          last_reviewed_at?: string | null;
          name: string;
          plain_language_summary?: string | null;
          published_at?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          state?: string | null;
          status?: string;
          tier?: string | null;
          track: string;
          typical_award?: string | null;
          updated_at?: string;
        };
        Update: {
          agency?: string | null;
          application_url?: string | null;
          category?: string;
          cover_image?: string | null;
          created_at?: string;
          deadline_info?: string | null;
          description?: string | null;
          eligibility_criteria?: Json;
          id?: string;
          industries?: string[] | null;
          last_reviewed_at?: string | null;
          name?: string;
          plain_language_summary?: string | null;
          published_at?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          state?: string | null;
          status?: string;
          tier?: string | null;
          track?: string;
          typical_award?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      purge_runs: {
        Row: {
          duration_ms: number | null;
          errors: Json | null;
          id: string;
          rows_purged: number;
          run_at: string;
          table_name: string;
        };
        Insert: {
          duration_ms?: number | null;
          errors?: Json | null;
          id?: string;
          rows_purged: number;
          run_at?: string;
          table_name: string;
        };
        Update: {
          duration_ms?: number | null;
          errors?: Json | null;
          id?: string;
          rows_purged?: number;
          run_at?: string;
          table_name?: string;
        };
        Relationships: [];
      };
      screening_results: {
        Row: {
          confidence_score: number;
          created_at: string;
          eligibility_tier: string;
          estimated_value: string | null;
          id: string;
          program_id: string;
          reasons: Json;
          screening_id: string;
          workspace_id: string;
        };
        Insert: {
          confidence_score: number;
          created_at?: string;
          eligibility_tier?: string;
          estimated_value?: string | null;
          id?: string;
          program_id: string;
          reasons: Json;
          screening_id: string;
          workspace_id: string;
        };
        Update: {
          confidence_score?: number;
          created_at?: string;
          eligibility_tier?: string;
          estimated_value?: string | null;
          id?: string;
          program_id?: string;
          reasons?: Json;
          screening_id?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "screening_results_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "screening_results_screening_id_fkey";
            columns: ["screening_id"];
            isOneToOne: false;
            referencedRelation: "screenings";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "screening_results_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      screenings: {
        Row: {
          answers: Json;
          created_at: string;
          deleted_at: string | null;
          engine_version: string;
          household_size: number | null;
          id: string;
          is_latest: boolean;
          language: string;
          last_viewed_at: string | null;
          saved_at: string | null;
          state: string | null;
          workspace_id: string;
          zip: string | null;
        };
        Insert: {
          answers: Json;
          created_at?: string;
          deleted_at?: string | null;
          engine_version: string;
          household_size?: number | null;
          id?: string;
          is_latest?: boolean;
          language?: string;
          last_viewed_at?: string | null;
          saved_at?: string | null;
          state?: string | null;
          workspace_id: string;
          zip?: string | null;
        };
        Update: {
          answers?: Json;
          created_at?: string;
          deleted_at?: string | null;
          engine_version?: string;
          household_size?: number | null;
          id?: string;
          is_latest?: boolean;
          language?: string;
          last_viewed_at?: string | null;
          saved_at?: string | null;
          state?: string | null;
          workspace_id?: string;
          zip?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "screenings_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean;
          canceled_at: string | null;
          created_at: string;
          current_period_end: string | null;
          current_period_start: string | null;
          id: string;
          status: Database["public"]["Enums"]["subscription_status"];
          stripe_customer_id: string;
          stripe_subscription_id: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          cancel_at_period_end?: boolean;
          canceled_at?: string | null;
          created_at?: string;
          current_period_end?: string | null;
          current_period_start?: string | null;
          id?: string;
          status: Database["public"]["Enums"]["subscription_status"];
          stripe_customer_id: string;
          stripe_subscription_id?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          cancel_at_period_end?: boolean;
          canceled_at?: string | null;
          created_at?: string;
          current_period_end?: string | null;
          current_period_start?: string | null;
          id?: string;
          status?: Database["public"]["Enums"]["subscription_status"];
          stripe_customer_id?: string;
          stripe_subscription_id?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      support_tickets: {
        Row: {
          assigned_to: string | null;
          body: string;
          closed_at: string | null;
          created_at: string;
          email: string;
          id: string;
          status: Database["public"]["Enums"]["ticket_status"];
          subject: string;
          updated_at: string;
          user_id: string | null;
          workspace_id: string | null;
        };
        Insert: {
          assigned_to?: string | null;
          body: string;
          closed_at?: string | null;
          created_at?: string;
          email: string;
          id?: string;
          status?: Database["public"]["Enums"]["ticket_status"];
          subject: string;
          updated_at?: string;
          user_id?: string | null;
          workspace_id?: string | null;
        };
        Update: {
          assigned_to?: string | null;
          body?: string;
          closed_at?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          status?: Database["public"]["Enums"]["ticket_status"];
          subject?: string;
          updated_at?: string;
          user_id?: string | null;
          workspace_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "support_tickets_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      user_profiles: {
        Row: {
          created_at: string;
          display_name: string | null;
          locale: string;
          marketing_opt_in: boolean;
          persona: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          locale?: string;
          marketing_opt_in?: boolean;
          persona?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          locale?: string;
          marketing_opt_in?: boolean;
          persona?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      user_settings: {
        Row: {
          email_notifications: boolean;
          last_viewed_workspace_id: string | null;
          notification_prefs: Json;
          timezone: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          email_notifications?: boolean;
          last_viewed_workspace_id?: string | null;
          notification_prefs?: Json;
          timezone?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          email_notifications?: boolean;
          last_viewed_workspace_id?: string | null;
          notification_prefs?: Json;
          timezone?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_settings_last_viewed_workspace_id_fkey";
            columns: ["last_viewed_workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      workspace_members: {
        Row: {
          joined_at: string;
          role: Database["public"]["Enums"]["workspace_role"];
          user_id: string;
          workspace_id: string;
        };
        Insert: {
          joined_at?: string;
          role?: Database["public"]["Enums"]["workspace_role"];
          user_id: string;
          workspace_id: string;
        };
        Update: {
          joined_at?: string;
          role?: Database["public"]["Enums"]["workspace_role"];
          user_id?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      workspaces: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: string;
          name: string;
          owner_user_id: string;
          slug: string;
          stripe_subscription_item_id: string | null;
          tier: Database["public"]["Enums"]["workspace_tier"];
          type: Database["public"]["Enums"]["workspace_type"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          name: string;
          owner_user_id: string;
          slug: string;
          stripe_subscription_item_id?: string | null;
          tier?: Database["public"]["Enums"]["workspace_tier"];
          type: Database["public"]["Enums"]["workspace_type"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          name?: string;
          owner_user_id?: string;
          slug?: string;
          stripe_subscription_item_id?: string | null;
          tier?: Database["public"]["Enums"]["workspace_tier"];
          type?: Database["public"]["Enums"]["workspace_type"];
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: { Args: never; Returns: boolean };
      is_workspace_member: { Args: { ws_id: string }; Returns: boolean };
    };
    Enums: {
      admin_role: "owner" | "operator" | "viewer";
      document_scan_status: "pending" | "clean" | "infected" | "error";
      export_kind: "export" | "erasure";
      export_status:
        | "requested"
        | "processing"
        | "ready"
        | "delivered"
        | "failed"
        | "expired";
      subscription_status:
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "unpaid";
      ticket_status: "open" | "pending" | "resolved" | "closed";
      workspace_role: "owner" | "member" | "viewer";
      workspace_tier: "free" | "premium";
      workspace_type: "individual" | "company";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      admin_role: ["owner", "operator", "viewer"],
      document_scan_status: ["pending", "clean", "infected", "error"],
      export_kind: ["export", "erasure"],
      export_status: [
        "requested",
        "processing",
        "ready",
        "delivered",
        "failed",
        "expired",
      ],
      subscription_status: [
        "trialing",
        "active",
        "past_due",
        "canceled",
        "incomplete",
        "incomplete_expired",
        "unpaid",
      ],
      ticket_status: ["open", "pending", "resolved", "closed"],
      workspace_role: ["owner", "member", "viewer"],
      workspace_tier: ["free", "premium"],
      workspace_type: ["individual", "company"],
    },
  },
} as const;

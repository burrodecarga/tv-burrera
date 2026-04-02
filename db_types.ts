export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      apuestas: {
        Row: {
          carrera_1: number | null
          carrera_2: number | null
          carrera_3: number | null
          carrera_4: number | null
          carrera_5: number | null
          carrera_6: number | null
          cobrado: number | null
          confirmada: number | null
          created_at: string
          fichas: number | null
          ganador: number | null
          id: string
          polla: string | null
          polla_id: string | null
          puntos: number | null
          puntos_1: number | null
          puntos_2: number | null
          puntos_3: number | null
          puntos_4: number | null
          puntos_5: number | null
          puntos_6: number | null
          user_id: string | null
        }
        Insert: {
          carrera_1?: number | null
          carrera_2?: number | null
          carrera_3?: number | null
          carrera_4?: number | null
          carrera_5?: number | null
          carrera_6?: number | null
          cobrado?: number | null
          confirmada?: number | null
          created_at?: string
          fichas?: number | null
          ganador?: number | null
          id?: string
          polla?: string | null
          polla_id?: string | null
          puntos?: number | null
          puntos_1?: number | null
          puntos_2?: number | null
          puntos_3?: number | null
          puntos_4?: number | null
          puntos_5?: number | null
          puntos_6?: number | null
          user_id?: string | null
        }
        Update: {
          carrera_1?: number | null
          carrera_2?: number | null
          carrera_3?: number | null
          carrera_4?: number | null
          carrera_5?: number | null
          carrera_6?: number | null
          cobrado?: number | null
          confirmada?: number | null
          created_at?: string
          fichas?: number | null
          ganador?: number | null
          id?: string
          polla?: string | null
          polla_id?: string | null
          puntos?: number | null
          puntos_1?: number | null
          puntos_2?: number | null
          puntos_3?: number | null
          puntos_4?: number | null
          puntos_5?: number | null
          puntos_6?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "apuestas_polla_id_fkey"
            columns: ["polla_id"]
            isOneToOne: false
            referencedRelation: "pollas"
            referencedColumns: ["id"]
          },
        ]
      }
      billeteras: {
        Row: {
          created_at: string
          fichas: number | null
          id: string
          id_user: string | null
          tasa: string | null
        }
        Insert: {
          created_at?: string
          fichas?: number | null
          id?: string
          id_user?: string | null
          tasa?: string | null
        }
        Update: {
          created_at?: string
          fichas?: number | null
          id?: string
          id_user?: string | null
          tasa?: string | null
        }
        Relationships: []
      }
      carreras: {
        Row: {
          created_at: string
          distancia: number | null
          fecha: string | null
          hora: string | null
          id: string
          num_carrera: number | null
          num_competidores: number | null
          polla_id: string | null
          tipo: string | null
        }
        Insert: {
          created_at?: string
          distancia?: number | null
          fecha?: string | null
          hora?: string | null
          id?: string
          num_carrera?: number | null
          num_competidores?: number | null
          polla_id?: string | null
          tipo?: string | null
        }
        Update: {
          created_at?: string
          distancia?: number | null
          fecha?: string | null
          hora?: string | null
          id?: string
          num_carrera?: number | null
          num_competidores?: number | null
          polla_id?: string | null
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "carreras_polla_id_fkey1"
            columns: ["polla_id"]
            isOneToOne: false
            referencedRelation: "pollas"
            referencedColumns: ["id"]
          },
        ]
      }
      ganadores: {
        Row: {
          carrera_id: string | null
          created_at: string
          ejemplar: number | null
          id: string
          posicion: number | null
          puntos: number | null
        }
        Insert: {
          carrera_id?: string | null
          created_at?: string
          ejemplar?: number | null
          id?: string
          posicion?: number | null
          puntos?: number | null
        }
        Update: {
          carrera_id?: string | null
          created_at?: string
          ejemplar?: number | null
          id?: string
          posicion?: number | null
          puntos?: number | null
        }
        Relationships: []
      }
      hipodromos: {
        Row: {
          country: string | null
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      plataformas: {
        Row: {
          activa: number | null
          created_at: string
          fecha: string | null
          id: string
          moneda: string
          plataforma: string | null
          simbolo: string | null
          tasa: number
        }
        Insert: {
          activa?: number | null
          created_at?: string
          fecha?: string | null
          id?: string
          moneda?: string
          plataforma?: string | null
          simbolo?: string | null
          tasa?: number
        }
        Update: {
          activa?: number | null
          created_at?: string
          fecha?: string | null
          id?: string
          moneda?: string
          plataforma?: string | null
          simbolo?: string | null
          tasa?: number
        }
        Relationships: []
      }
      pollas: {
        Row: {
          apostadores: number | null
          carrera1_dist: number | null
          carrera1_ejem: number | null
          carrera1_hor: string | null
          carrera2_dist: number | null
          carrera2_ejem: number | null
          carrera2_hor: string | null
          carrera3_dist: number | null
          carrera3_ejem: number | null
          carrera3_hor: string | null
          carrera4_dist: number | null
          carrera4_ejem: number | null
          carrera4_hor: string | null
          carrera5_dist: number | null
          carrera5_ejem: number | null
          carrera5_hor: string | null
          carrera6_dist: number | null
          carrera6_ejem: number | null
          carrera6_hor: string | null
          condicion: number | null
          created_at: string
          fecha: string | null
          fecha_de_cierre: string | null
          hipodromo: string | null
          hora_de_cierre: string | null
          id: string
          nombre: string | null
          pais: string | null
          precio: number | null
          premio: number | null
        }
        Insert: {
          apostadores?: number | null
          carrera1_dist?: number | null
          carrera1_ejem?: number | null
          carrera1_hor?: string | null
          carrera2_dist?: number | null
          carrera2_ejem?: number | null
          carrera2_hor?: string | null
          carrera3_dist?: number | null
          carrera3_ejem?: number | null
          carrera3_hor?: string | null
          carrera4_dist?: number | null
          carrera4_ejem?: number | null
          carrera4_hor?: string | null
          carrera5_dist?: number | null
          carrera5_ejem?: number | null
          carrera5_hor?: string | null
          carrera6_dist?: number | null
          carrera6_ejem?: number | null
          carrera6_hor?: string | null
          condicion?: number | null
          created_at?: string
          fecha?: string | null
          fecha_de_cierre?: string | null
          hipodromo?: string | null
          hora_de_cierre?: string | null
          id?: string
          nombre?: string | null
          pais?: string | null
          precio?: number | null
          premio?: number | null
        }
        Update: {
          apostadores?: number | null
          carrera1_dist?: number | null
          carrera1_ejem?: number | null
          carrera1_hor?: string | null
          carrera2_dist?: number | null
          carrera2_ejem?: number | null
          carrera2_hor?: string | null
          carrera3_dist?: number | null
          carrera3_ejem?: number | null
          carrera3_hor?: string | null
          carrera4_dist?: number | null
          carrera4_ejem?: number | null
          carrera4_hor?: string | null
          carrera5_dist?: number | null
          carrera5_ejem?: number | null
          carrera5_hor?: string | null
          carrera6_dist?: number | null
          carrera6_ejem?: number | null
          carrera6_hor?: string | null
          condicion?: number | null
          created_at?: string
          fecha?: string | null
          fecha_de_cierre?: string | null
          hipodromo?: string | null
          hora_de_cierre?: string | null
          id?: string
          nombre?: string | null
          pais?: string | null
          precio?: number | null
          premio?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          fichas: number | null
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          fichas?: number | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          fichas?: number | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      resultados: {
        Row: {
          caballo: number | null
          carrera_id: string | null
          created_at: string
          id: string
          posicion: number | null
          puntos: number | null
        }
        Insert: {
          caballo?: number | null
          carrera_id?: string | null
          created_at?: string
          id?: string
          posicion?: number | null
          puntos?: number | null
        }
        Update: {
          caballo?: number | null
          carrera_id?: string | null
          created_at?: string
          id?: string
          posicion?: number | null
          puntos?: number | null
        }
        Relationships: []
      }
      tasas: {
        Row: {
          activa: number | null
          created_at: string
          fecha: string | null
          id: string
          moneda: string
          tasa: number
        }
        Insert: {
          activa?: number | null
          created_at?: string
          fecha?: string | null
          id?: string
          moneda?: string
          tasa?: number
        }
        Update: {
          activa?: number | null
          created_at?: string
          fecha?: string | null
          id?: string
          moneda?: string
          tasa?: number
        }
        Relationships: []
      }
      transacciones: {
        Row: {
          confirmado: number | null
          created_at: string
          fichas: number | null
          id: string
          id_billetera: string | null
          imagen: string | null
          plataforma: string | null
          referencia: string | null
          responsable: string | null
          tasa: number | null
          tipo: number | null
        }
        Insert: {
          confirmado?: number | null
          created_at?: string
          fichas?: number | null
          id?: string
          id_billetera?: string | null
          imagen?: string | null
          plataforma?: string | null
          referencia?: string | null
          responsable?: string | null
          tasa?: number | null
          tipo?: number | null
        }
        Update: {
          confirmado?: number | null
          created_at?: string
          fichas?: number | null
          id?: string
          id_billetera?: string | null
          imagen?: string | null
          plataforma?: string | null
          referencia?: string | null
          responsable?: string | null
          tasa?: number | null
          tipo?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "transacciones_id_billetera_fkey"
            columns: ["id_billetera"]
            isOneToOne: false
            referencedRelation: "billeteras"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      darse_de_baja: { Args: { user_id: string }; Returns: undefined }
      delete_own_user: { Args: never; Returns: undefined }
      delete_user: { Args: { id: string }; Returns: undefined }
      disponibilidad: { Args: { user_id: string }; Returns: number }
      get_pollas_and_carreras: { Args: { param: number }; Returns: string }
      hello_name: { Args: { name_param: string }; Returns: string }
      restar_de_billetera: {
        Args: { monto: number; usuario: string }
        Returns: undefined
      }
      sumar_a_billetera: {
        Args: { monto: number; user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

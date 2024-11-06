export interface Task {
    id: number;
    title: string;
    description: string;
    completion_date: Date;
    status: boolean;
    showFullDescription?: boolean; // Opcional para controle de exibição
  }
  
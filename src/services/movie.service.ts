import { toast } from "react-toastify";

export interface MovieModel {
  Id: number;
  Name: string;
  Description: string;
  Rate: number;
}

export interface NewMovieModel {
  name: string;
  description: string;
  rate: number;
}
export class MovieService {
  async getMovies(): Promise<Response> {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch("http://localhost:3000/movie", {
        headers,
      });

      if (!response.ok) {
        toast.error("Erro ao buscar filmes");
      }
      return response;
    } catch (error) {
      toast.error("Erro ao buscar filmes");
      console.error("Error:", error);
      throw error;
    }
  }


  async addMovie(movie: NewMovieModel): Promise<Response> {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch("http://localhost:3000/movie", {
        headers,
        method: "POST",
        body: JSON.stringify(movie),
      });

      if (!response.ok) {
        toast.error("Erro ao adicionar filme");
      }
      return response;
    } catch (error) {
      toast.error("Erro ao adicionar filme");
      console.error("Error:", error);
      throw error;
    }
  }

  async deleteMovie(id: number): Promise<Response> {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`http://localhost:3000/movie/${id}`, {
        headers,
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Erro ao deletar filme");
      }
      return response;
    } catch (error) {
      toast.error("Erro ao deletar filme");
      console.error("Error:", error);
      throw error;
    }
  }
}

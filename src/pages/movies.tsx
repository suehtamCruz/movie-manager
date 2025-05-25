import { faCircleXmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  MovieModel,
  MovieService,
  NewMovieModel,
} from "../services/movie.service";
import styles from "../styles/movies.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Movies() {
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [movieName, setMovieName] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [movieRate, setMovieRate] = useState<number | undefined>(undefined);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const movieService = new MovieService();
  const router = useRouter();
  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");

    window.dispatchEvent(new Event("storage"));

    toast.success("Logout realizado com sucesso!", {
      autoClose: 5000,
    });

    router.push("/login");
  };

  const fetchData = async () => {
    try {
      const data = await movieService.getMovies();
      const moviesData = await data.json();
      setLoading(false);
      if (moviesData.statusCode === 401) {
        toast.error("Erro ao buscar filmes");
        setLoading(false);
        handleLogout();
        return;
      }

      setMovies(moviesData);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  const handleAddNewMovie = () => {
    const newMovie: NewMovieModel = {
      name: movieName,
      description: movieDescription,
      rate: Number(movieRate),
    };
    movieService.addMovie(newMovie).then(() => {
      toast.success("Filme adicionado com sucesso!", {
        autoClose: 2000,
      });
      setModalIsOpen(false);
      fetchData();
    });
  };

  const handleDeleteMovie = (id: number) => {
    movieService.deleteMovie(id).then(() => {
      toast.success("Filme deletado com sucesso!", {
        autoClose: 2000,
      });
      fetchData();
    });
  };

  return (
    <>
      <section className={styles["movie-container"]}>
        <section className={styles.header}>
          <button
            onClick={() => setModalIsOpen(true)}
            className={styles["new-movie-button"]}
          >
            Adicionar filme
          </button>
        </section>
        <div className={styles["movies-container"]}>
          {loading ? (
            <p>Buscando filmes...</p>
          ) : (
            movies.map((movie: MovieModel) => (
              <div key={movie.Id} className={styles["movie"]}>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={() => handleDeleteMovie(movie.Id)}
                  size="sm"
                  style={{ cursor: "pointer", position: "absolute", top: 10, right: 10 }}
                />
                <h2 className={styles.title}>{movie.Name}</h2>
                <p style={{ textAlign: "center", fontSize: "14px" }}>
                  {movie.Description}
                </p>
                <p style={{ textAlign: "center", fontSize: "14px" }}>
                  {Math.ceil(movie.Rate / 10)} / 10
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onAfterClose={() => {
          setMovieName("");
          setMovieDescription("");
          setMovieRate(undefined);
        }}
        style={{
          overlay: {
            width: 300,
            height: 250,
            top: "50%",
            left: "50%",
            padding: 0,
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
          },
          content: {
            border: "none",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            minWidth: 300,
            maxWidth: 300,
            height: "100%",
            minHeight: 250,
            maxHeight: 250,
          },
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon
            icon={faCircleXmark}
            onClick={() => setModalIsOpen(false)}
            size="lg"
          />
        </div>
        <h2>Adicionar Filme</h2>
        <input
          type="text"
          placeholder="Nome"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={movieDescription}
          onChange={(e) => setMovieDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Nota"
          min={0}
          max={10}
          value={movieRate}
          onChange={(e) => setMovieRate(Number(e.target.value))}
        />

        <button
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px",
            backgroundColor: "#000",
            color: "white",
            cursor: "pointer",
            border: "none",
            borderRadius: "8px",
          }}
          onClick={handleAddNewMovie}
        >
          Adicionar
        </button>
      </Modal>
    </>
  );
}

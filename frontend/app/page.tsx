"use client";

import { useEffect, useState } from "react";
import HeroCarousel from "./components/HeroCarousel";

type Pokemon = {
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
};

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [searchVersion, setSearchVersion] = useState(0);

  const limit = 12;

  async function fetchPokemons(
    pageNumber: number,
    search: string
  ): Promise<Pokemon[]> {
    const params = new URLSearchParams({
      page: String(pageNumber),
      limit: String(limit),
    });

    if (search) {
      params.set("search", search);
    }

    const response = await fetch(
      `http://127.0.0.1:8000/api/pokemons?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch pokemons");
    }

    return response.json();
  }

  useEffect(() => {
    async function loadPokemons() {
      setLoading(true);
      setPage(1);

      try {
        const data = await fetchPokemons(1, appliedSearchTerm);
        setPokemons(data);
        setHasMore(data.length === limit);
      } catch (error) {
        console.error(error);
        setPokemons([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    }

    loadPokemons();
  }, [appliedSearchTerm, searchVersion]);

  async function handleLoadMore() {
    const nextPage = page + 1;
    setLoadingMore(true);

    try {
      const data = await fetchPokemons(nextPage, appliedSearchTerm);

      setPokemons((prev) => [...prev, ...data]);
      setPage(nextPage);
      setHasMore(data.length === limit);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  }

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppliedSearchTerm(searchTerm.trim().toLowerCase());
    setSearchVersion((currentVersion) => currentVersion + 1);
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <section className="grid grid-cols-1 lg:grid-cols-[2.2fr_1fr] gap-4">
          <HeroCarousel />

          <div className="grid grid-rows-2 gap-4 h-full">
            <div className="overflow-hidden">
              <img
                src="/static-banner1.jpg"
                alt="Static banner 1"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="overflow-hidden">
              <img
                src="/static-banner2.jpg"
                alt="Static banner 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="pt-6 grid grid-cols-[180px_1fr_180px] gap-4 items-start">
          <div className="sticky top-6">
            <div className="overflow-hidden">
              <img
                src="/verticle-banner.png"
                alt="Left static banner"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="p-4 bg-white rounded-md">
            <div className="sticky top-6 z-30 bg-white pb-4 relative before:content-[''] before:absolute before:left-0 before:right-0 before:-top-6 before:h-6 before:bg-white">
              <div className="bg-white">
                <form onSubmit={handleSearchSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Pokemon Name"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded-md"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>

            {loading ? (
              <p className="text-sm text-gray-500">Loading Pokémon...</p>
            ) : (
              <>
                {pokemons.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No Pokémon found for {appliedSearchTerm}.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {pokemons.map((pokemon) => (
                      <div
                        key={`${pokemon.name}-${pokemon.height}-${pokemon.weight}`}
                        className="border border-gray-200 rounded-md p-3 flex items-center gap-3 bg-white"
                      >
                        <img
                          src={pokemon.image}
                          alt={pokemon.name}
                          className="w-14 h-14 object-contain"
                        />

                        <div>
                          <p className="font-semibold text-sm capitalize">
                            {pokemon.name}
                          </p>

                          <div className="flex gap-1 mt-1 flex-wrap">
                            {pokemon.types.map((type) => (
                              <span
                                key={type}
                                className="text-[10px] bg-gray-100 px-2 py-0.5 rounded"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {hasMore && (
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="bg-gray-400 disabled:opacity-60 text-white font-semibold px-6 py-2 rounded-md cursor-pointer"
                    >
                      {loadingMore ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="sticky top-6">
            <div className="overflow-hidden">
              <img
                src="/verticle-banner.png"
                alt="Right static banner"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

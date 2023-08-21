import { useEffect, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { RecoilState, useRecoilValue } from "recoil"
import { CircularProgress } from "@mui/material"
import Button from "@mui/material/Button"

import Box, { CenterRow, Col } from "./common/Box"
import Card from "./common/Card"
import { Grid } from "./index.styled"
import {
  initialPokemonDataState,
  loadingState,
  nextUrlState,
  pokemonDataState,
  prevUrlState,
} from "../recoil/state"
import { PokemonDetail } from "./utils/pokemonTypes"
import { getAllPokemon, loadPokemon } from "./utils/pokemonUtils"

const MainScreen = () => {
  const initialPokemonData = useRecoilValue(initialPokemonDataState)
  const pokemonData = useRecoilValue(pokemonDataState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [nextUrl, setNextUrl] = useRecoilState(nextUrlState)
  const [prevUrl, setPrevUrl] = useRecoilState(prevUrlState)
  const setPokemonData = useSetRecoilState(pokemonDataState)
  const [isAnimating, setIsAnimating] = useState(true)

  const handlePageChange = async (url: string | null) => {
    if (!url) return
    if (!url) return
    setIsAnimating(false)
    setLoading(true)
    const newData = await getAllPokemon(url)
    const newPokemonData = await loadPokemon(newData.results)

    setPokemonData(newPokemonData as PokemonDetail[])
    setNextUrl(newData.next)
    setPrevUrl(newData.previous)
    setLoading(false)
    setIsAnimating(true)
  }

  useEffect(() => {
    setNextUrl(initialPokemonData?.next || null)
    setPrevUrl(initialPokemonData?.previous || null)
  }, [initialPokemonData])

  console.log("initialPokemonData", initialPokemonData)
  console.log("pokemonData", pokemonData)
  console.log("prev", prevUrl)
  console.log("next", nextUrl)

  return (
    <Col centerAlign>
      {loading ? (
        <CenterRow pt={140} pb={140}>
          <CircularProgress size={100} color="inherit" />
        </CenterRow>
      ) : (
        <Grid className={isAnimating ? "fade-entering" : "fade-entered"}>
          {pokemonData.map((pokemon: PokemonDetail, index) => (
            <div
              key={index}
              className={isAnimating ? "fade-entering" : "fade-entered"}
            >
              <Card url={pokemon.sprites.front_default} name={pokemon.name} />
            </div>
          ))}
        </Grid>
      )}
      <Box>
        <Button onClick={() => handlePageChange(prevUrl)}>Prev</Button>
        <Button onClick={() => handlePageChange(nextUrl)}>Next</Button>
      </Box>
    </Col>
  )
}

export default MainScreen

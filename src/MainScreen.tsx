import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { PokemonDetail } from "./utils/pokemon"
import Button from "@mui/material/Button"
import Card from "./common/Card"
import { Grid } from "./index.styled"
import Box, { Col } from "./common/Box"
import { getAllPokemon, loadPokemon } from "./utils/pokemon"
import {
  initialPokemonDataState,
  loadingState,
  nextUrlState,
  pokemonDataState,
  prevUrlState,
} from "../recoil/state"
import { RecoilState, useRecoilValue } from "recoil"

const MainScreen = () => {
  const initialPokemonData = useRecoilValue(initialPokemonDataState)
  const pokemonData = useRecoilValue(pokemonDataState)
  const loading = useRecoilValue(loadingState)
  const [nextUrl, setNextUrl] = useRecoilState(nextUrlState)
  const [prevUrl, setPrevUrl] = useRecoilState(prevUrlState)

  useEffect(() => {
    setNextUrl(initialPokemonData?.next || null)
    setPrevUrl(initialPokemonData?.previous || null)
  }, [initialPokemonData])

  const handlePageChange = async (url: string | null) => {
    if (!url) return

    const newData = await getAllPokemon(url)
    setNextUrl(newData.next)
    setPrevUrl(newData.previous)
  }
  // この時点で次のページや前のページのデータも取得することができます。
  // 必要に応じて、そのデータを使用してstateを更新することができます。

  console.log("initialPokemonData", initialPokemonData)
  console.log("pokemonData", pokemonData)

  console.log("prev", prevUrl)
  console.log("next", nextUrl)
  return (
    <Col centerAlign>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Grid>
          {pokemonData.map((pokemon: PokemonDetail, index) => (
            <div key={index}>
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

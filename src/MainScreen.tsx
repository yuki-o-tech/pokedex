import { useEffect, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { RecoilState, useRecoilValue } from "recoil"
import { CircularProgress, Pagination } from "@mui/material"
import Box, { CenterRow, Col } from "./common/Box"
import Card from "./common/Card"
import { Grid } from "./index.styled"
import { loadingState, pokemonDataState } from "../recoil/pokemonData"
import { PokemonDetail } from "./utils/pokemonTypes"
import {
  get20Pokemons,
  getPokemonListUrl,
  loadPokemon,
} from "./utils/pokemonUtils"
import { currentPageState, totalPokemonState } from "../recoil/pagination"

const MainScreen = () => {
  const pokemonData = useRecoilValue(pokemonDataState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const setPokemonData = useSetRecoilState(pokemonDataState)
  const [isAnimating, setIsAnimating] = useState(true)
  const totalItems = useRecoilValue(totalPokemonState)
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState)

  const testhundlePageeChange = async (page: number) => {
    setLoading(true) // ローディング状態をtrueに設定
    const newUrl = getPokemonListUrl(page)
    console.log("page", page)
    const newData = await get20Pokemons(newUrl)
    console.log("newData", newData)
    const newLoadedData = await loadPokemon(newData.results)
    setPokemonData(newLoadedData as PokemonDetail[]) // 新しいデータでステートを更新
    setCurrentPage(page)
    console.log("new current page", currentPage)
    setLoading(false) // ローディング状態をfalseに設定
    setIsAnimating(true) // アニメーションを再開
  }

  // ページ数を計算
  const totalPage = Math.ceil(totalItems / 20)

  //currentPage ステートが更新されるたびに実行
  useEffect(() => {
    console.log("Current page has been updated: ", currentPage)
  }, [currentPage])
  console.log("pokemonData", pokemonData)
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
              <Card
                url={pokemon.sprites.front_default}
                name={pokemon.species.name}
              />
            </div>
          ))}
        </Grid>
      )}
      <Pagination
        count={totalPage}
        page={currentPage}
        hidePrevButton={currentPage === 1}
        hideNextButton={currentPage === totalPage}
        onChange={(event, page) => {
          testhundlePageeChange(page)
          console.log("page argument number", page)
        }}
      />
    </Col>
  )
}

export default MainScreen

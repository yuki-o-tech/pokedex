import { useEffect, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { RecoilState, useRecoilValue } from "recoil"
import { CircularProgress, Pagination } from "@mui/material"
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
} from "../recoil/pokemonData"
import { PokemonDetail } from "./utils/pokemonTypes"
import { getAllPokemon, loadPokemon } from "./utils/pokemonUtils"
//will delete
import PokemonPagination from "./components/Pagination"
import { currentPageState, totalPokemonState } from "../recoil/pagination"

const MainScreen = () => {
  const initialPokemonData = useRecoilValue(initialPokemonDataState)
  const pokemonData = useRecoilValue(pokemonDataState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [nextUrl, setNextUrl] = useRecoilState(nextUrlState)
  const [prevUrl, setPrevUrl] = useRecoilState(prevUrlState)
  const setPokemonData = useSetRecoilState(pokemonDataState)
  const [isAnimating, setIsAnimating] = useState(true)
  // const pokemonList = useRecoilValue(pokemonListState)
  const totalItems = useRecoilValue(totalPokemonState)
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState)
  // const currentPage = useRecoilValue(currentPageState);

  // ページが変更されたときに新しいポケモンデータをロードする関数
  const handlePageChange = async (url: string | null) => {
    // URLがnullなら何もしない
    if (!url) return
    setIsAnimating(false) // poke cardが表示されるアニメーションを停止
    setLoading(true) // ローディング状態をtrueに設定
    const newData = await getAllPokemon(url)
    console.log("new Data url", newData)
    const newPokemonData = await loadPokemon(newData.results)
    // console.log("current data results", initialPokemonData)
    setPokemonData(newPokemonData as PokemonDetail[]) // 新しいデータでステートを更新
    setNextUrl(newData.next) // 次のページのURLを更新
    setPrevUrl(newData.previous) // 前のページのURLを更新

    //
    // culclate currentPage
    if (newData.next === null) {
      //null = last page
      return setCurrentPage(totalPage)
    } else {
      const parsedUrl = new URL(newData.next)
      const offsetValue = parsedUrl.searchParams.get("offset")
      console.log("Offset value is:", offsetValue)
      const calcCurrentPageNumber = Math.floor(Number(offsetValue) / 20)
      console.log("calcCurrentPageNumber:::", calcCurrentPageNumber)
      setCurrentPage(calcCurrentPageNumber)
      // await setCurrentPage(calcCurrentPageNumber)
      console.log("new current page", currentPage)
    }

    //

    setLoading(false) // ローディング状態をfalseに設定
    setIsAnimating(true) // アニメーションを再開
  }

  // ページのオフセットを計算して現在のページを更新する関数
  const caluculatedPage = (url: string | null) => {
    // URLがnullなら何もしない
    if (!url) return
    const pageUrl = new URL(url)
    console.log("pageUrl", pageUrl)
    const params = new URLSearchParams(pageUrl.search)
    const offset = params.get("offset") // オフセットを取得
    console.log("offset next", offset)
    console.log("currentPage", currentPage)
    if (offset !== null) {
      const calculatedPage = Math.floor(Number(offset) / 20) + 1
      console.log("Before setting currentPage: ", currentPage)
      console.log("Calculated Page: ", calculatedPage)
      setCurrentPage(calculatedPage) // 新しいページ数でステートを更新
      console.log("After setting currentPage: ", currentPage)
    }
  }
  // ページ数を計算
  const totalPage = Math.ceil(totalItems / 20)
  // console.log("total", totalPage)

  // 初期データが変更された場合、次と前のURLを更新
  useEffect(() => {
    if (initialPokemonData) {
      setNextUrl(initialPokemonData?.next || null)
      setPrevUrl(initialPokemonData?.previous || null)
    }
  }, [initialPokemonData])

  //currentPage ステートが更新されるたびに実行
  useEffect(() => {
    console.log("Current page has been updated: ", currentPage)
  }, [currentPage])
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
      <Pagination
        count={totalPage}
        page={currentPage}
        hidePrevButton={currentPage === 1}
        hideNextButton={currentPage === totalPage}
        onChange={(event, page) => {
          // if (page > currentPage) {
          //   handlePageChange(nextUrl)
          // } else {
          //   handlePageChange(prevUrl)
          // }
          console.log("page argument number", page)
          console.log("event value", event)
          // const newOffset = (page - 1) * 20 // 1ページあたり20項目であると仮定
          setCurrentPage(page) // RecoilのcurrentPageStateを更新
        }}
      />
      {/* <Box>
        <Button
          disabled={!prevUrl} // prevUrlがnullまたはundefinedの場合はボタンを無効化
          onClick={() => {
            handlePageChange(prevUrl)
          }}
        >
          Prev
        </Button>
        {currentPage}...{totalPage}
        <Button
          disabled={!nextUrl} // nextUrlがnullまたはundefinedの場合はボタンを無効化
          onClick={() => {
            handlePageChange(nextUrl)
          }}
        >
          Next
        </Button>
      </Box> */}
    </Col>
  )
}

export default MainScreen

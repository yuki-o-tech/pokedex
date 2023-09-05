import { useEffect, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { useRecoilValue } from "recoil"
import { CircularProgress, Pagination } from "@mui/material"
import { CenterCol, Col } from "./common/Box"
import Card, { PokemonTypeInfo } from "./common/Card"
import { Grid } from "./index.styled"
import {
  loadingState,
  pokemonDataState,
  pokemonJapaneseNameState,
  pokemonTypeInJapaneseState,
} from "../recoil/pokemonData"
import { currentPageState, totalPokemonState } from "../recoil/pagination"
import {
  getPokemonTypeIconColor,
  getPokemonTypeIcon,
} from "./utils/getPokemonTypeIcon"
import { PokemonBasicData } from "./utils/pokemonTypes"
import {
  get20Pokemons,
  getJapaneseName,
  getJapanesePokemonData,
  getPokemonListUrl,
  loadPokemon,
  getPokemonType,
} from "./utils/pokemonUtils"
import Text from "./common/Text"
import { Colors } from "./utils/Colors"

const MainScreen = () => {
  const pokemonData = useRecoilValue(pokemonDataState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const setPokemonData = useSetRecoilState(pokemonDataState)
  const [isAnimating, setIsAnimating] = useState(true)
  const totalItems = useRecoilValue(totalPokemonState)
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState)
  const [japaneseNames, setJapaneseNames] = useRecoilState(
    pokemonJapaneseNameState
  )
  const [pokemonTypesInJapanese, setPokemonTypesInJapanese] = useRecoilState(
    pokemonTypeInJapaneseState
  )

  const hundlePageChange = async (page: number) => {
    setLoading(true) // ローディング状態をtrueに設定
    const newUrl = getPokemonListUrl(page)
    console.log("page", page)
    const newData = await get20Pokemons(newUrl)
    console.log("newData", newData)
    const newLoadedData = await loadPokemon(newData.results)
    setPokemonData(newLoadedData as PokemonBasicData[]) // 新しいデータでステートを更新
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

  useEffect(() => {
    setLoading(true)
    if (pokemonData.length > 0) {
      // 日本語の名前を取得
      const fetchJapaneseNames = async () => {
        const newJapaneseNames = [] as string[] // 配列を用意

        for (const pokemon of pokemonData) {
          const pokemonDetail = await getJapanesePokemonData(
            pokemon.species.url
          )
          const japaneseName = getJapaneseName(pokemonDetail)
          if (japaneseName !== null) {
            newJapaneseNames.push(japaneseName)
          }
        }

        setJapaneseNames(newJapaneseNames)
      }

      // 日本語のタイプを取得
      const fetchJapaneseTypes = async () => {
        const newJapaneseTypes = await Promise.all(
          pokemonData.map(async (pokemon: PokemonBasicData) => {
            console.log("pokemon.types", pokemon.types)
            return await getPokemonType(pokemon.types)
          })
        )
        if (newJapaneseTypes !== null) {
          return setPokemonTypesInJapanese(newJapaneseTypes)
        }
      }

      // 名前とタイプの取得を並列で実行
      Promise.all([fetchJapaneseNames(), fetchJapaneseTypes()])
        .then(() => {
          console.log("Fetched both names and types in Japanese.")
        })
        .catch(error => {
          console.error("Error while fetching names or types:", error)
        })
        .finally(() => {
          setLoading(false) // 全ての非同期処理が終了したらローディングを終了
        })
    }
  }, [pokemonData])

  return (
    <Col centerAlign pb={40}>
      {loading ? (
        <CenterCol pt={280} pb={140} gap={20}>
          <CircularProgress size={100} color="warning" />
          <Text fs={25} color={Colors.BLACK}>
            Loading...
          </Text>
        </CenterCol>
      ) : (
        <>
          <Grid className={isAnimating ? "fade-entering" : "fade-entered"}>
            {pokemonData.map((pokemon: PokemonBasicData, index) => {
              const japaneseName = japaneseNames[index]
              const typesForThisPokemon = (
                pokemonTypesInJapanese[index] || []
              ).filter(Boolean)

              const pokeTypes = typesForThisPokemon
                .map(type => {
                  if (type) {
                    return {
                      type: type,
                      color: getPokemonTypeIconColor(type),
                      icon: () => getPokemonTypeIcon(type),
                    }
                  }
                })
                .filter(Boolean) as PokemonTypeInfo[]

              return (
                <div
                  key={index}
                  className={isAnimating ? "fade-entering" : "fade-entered"}
                >
                  <Card
                    // imgUrl={pokemon.sprites.front_default} // game ish img
                    imgUrl={
                      pokemon.sprites.other["official-artwork"].front_default
                    }
                    name={japaneseName}
                    height={pokemon.height / 10}
                    weight={pokemon.weight / 10}
                    pokeTypes={pokeTypes}
                  />
                </div>
              )
            })}
          </Grid>
          <Pagination
            count={totalPage}
            page={currentPage}
            hidePrevButton={currentPage === 1}
            hideNextButton={currentPage === totalPage}
            onChange={(event, page) => {
              hundlePageChange(page)
              console.log("page argument number", page)
            }}
          />
        </>
      )}
    </Col>
  )
}

export default MainScreen

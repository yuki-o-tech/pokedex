import React, { useEffect } from "react"
import Pagination from "@mui/material/Pagination"
import { Box } from "@mui/system"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  currentPageState,
  pokemonListState,
  totalPokemonState,
} from "../../recoil/pagination"
import { nextUrlState } from "../../recoil/pokemonData"

const ITEMS_PER_PAGE = 20

interface PokemonPaginationProps {
  // handlePageChange: (url: string | null) => void
  handlePageChange: (value: string) => void
}

const PokemonPagination = ({ handlePageChange }: PokemonPaginationProps) => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState)
  const pokemonData = useRecoilValue(pokemonListState)
  const totalItems = useRecoilValue(totalPokemonState)
  const [nextUrl, setNextUrl] = useRecoilState(nextUrlState)
  console.log("currentPage", currentPage)
  console.log("pokemonData", pokemonData)
  console.log("totalItems", totalItems)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (!nextUrl) return

    const url = new URL(nextUrl)
    const params = new URLSearchParams(url.search)
    const offset = params.get("offset")
    console.log("currentPage", currentPage)

    if (offset !== null) {
      const calculatedPage = Math.floor(Number(offset) / 20) + 1
      console.log("Before setting currentPage: ", currentPage)
      setCurrentPage(calculatedPage)
      console.log("After setting currentPage: ", currentPage)
    }

    handlePageChange(nextUrl)
  }
  useEffect(() => {
    console.log("currentPage has been updated: ", currentPage)
  }, [currentPage])

  return (
    <Box>
      <Box mt={4}>
        <Pagination
          count={Math.ceil(totalItems / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={() => handleChange}
        />
      </Box>
    </Box>
  )
}

export default PokemonPagination

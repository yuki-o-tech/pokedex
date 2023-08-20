import { PokemonDetail } from "./utils/pokemon"
import Card from "./common/Card"
import { Grid } from "./index.styled"

interface MainScreenProps {
  dataArr: PokemonDetail[]
  isLoading: boolean
}
const MainScreen = ({ dataArr, isLoading }: MainScreenProps) => {
  return (
    <>
      {isLoading ? (
        <div>"Loading..." </div>
      ) : (
        <Grid>
          {dataArr.map((pokemon: PokemonDetail, index) => {
            console.log("img", pokemon.sprites.front_default)
            return (
              <>
                <Card url={pokemon.sprites.front_default} name={pokemon.name} />

                {/* <div>type:</div> */}
                {/* {pokemon.types.map((pokeType: TypeDetail, index) => {
                return <div>{pokeType.type.name}</div>
              })} */}
                {/* <div>weight:{pokemon.weight}</div>
              <div>height:{pokemon.height}</div>
              <div>ability:{pokemon.abilities[0].ability.name}</div> */}
              </>
            )
          })}
        </Grid>
      )}
    </>
  )
}

export default MainScreen

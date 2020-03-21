import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import Recipe from "./Recipe"
import Search from "./Search"
import { ReactComponent as Spinner } from "../spinner.svg"

const App: React.FC = () => {
    const APP_ID = process.env.REACT_APP_API_ID
    const APP_KEY = process.env.REACT_APP_KEY

    const [recipes, setRecipes] = useState<any[]>([])
    const [search, setSearch] = useState<string>("chicken")
    const [loading, setLoading] = useState<boolean>(false)
    // const [query, setQuery] = useState<string>("chicken")

    const getData: any = useCallback(
        async (text: string) => {
            try {
                setLoading(true)
                const index = Math.floor(Math.random() * 100)

                const response = await fetch(
                    `https://api.edamam.com/search?q=${text}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${index}`
                )
                const data = await response.json()
                setRecipes(prev => {
                    return [...prev, ...data.hits]
                })
                setLoading(false)
            } catch (e) {
                const response = await fetch(
                    `https://api.edamam.com/search?q=${text}&app_id=${APP_ID}&app_key=${APP_KEY}`
                )
                const data = await response.json()
                setRecipes(prev => {
                    return [...prev, ...data.hits]
                })
                setLoading(false)
            }
        },
        [APP_ID, APP_KEY]
    )

    useEffect(() => {
        getData(search)
        // eslint-disable-next-line
    }, [])

    const handleChange = useCallback(e => {
        setSearch(e.target.value)
    }, [])

    const handleSubmit = useCallback(
        e => {
            setRecipes([])
            e.preventDefault()
            getData(search)
            setSearch("")
        },
        [getData, search]
    )

    const loadMore = () => {
        getData(search)
    }

    return (
        <>
            <Loading loading={loading ? "loading" : "loaded"}>
                <Spinner width='5rem' height='5rem' />
            </Loading>
            <Search
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                search={search}
            />
            <RecipeList>
                {recipes.map(({ recipe }: any, i: number) => (
                    <Recipe
                        key={i}
                        title={recipe.label}
                        calories={recipe.calories}
                        img={recipe.image}
                        ingredients={recipe.ingredients}
                    />
                ))}
            </RecipeList>
            <More
                onClick={loadMore}
                loading={loading ? "loading" : "loaded"}></More>
            <ScrollButton href='#root'>↑</ScrollButton>
        </>
    )
}

const Loading = styled.div<{ loading: "loading" | "loaded" }>`
    display: ${({ loading }) => (loading === "loading" ? "block" : "none")};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const More = styled.div<{ loading: "loading" | "loaded" }>`
    text-align: center;
    margin: 0 auto 2rem auto;
    width: 2rem;
    height: 2rem;
    border-left: solid 0.2rem rgb(50, 50, 50);
    border-bottom: solid 0.2rem rgb(50, 50, 50);
    border-radius: 0.25rem;
    transform: rotate(-45deg);
    cursor: pointer;
    display: ${({ loading }) => (loading === "loading" ? "none" : "block")};
`

const ScrollButton = styled.a`
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    width: 3rem;
    height: 3rem;
    background-color: whitesmoke;
    text-decoration: none;
    color: #353535;
    text-align: center;
    line-height: 3rem;
    font-size: 1.5rem;
`

const RecipeList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    justify-content: space-evenly;
    align-items: stretch;
    grid-gap: 2rem;
    padding: 2rem;
    margin: 0 auto;
`

export default App

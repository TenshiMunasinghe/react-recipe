import React, { useState, useEffect, useCallback } from "react"
import Recipe from "./Recipe"

interface Props {}

const App: React.FC<Props> = () => {
	const APP_ID = process.env.REACT_APP_API_ID
	const APP_KEY = process.env.REACT_APP_KEY

	const [recipes, setRecipes] = useState<[]>([])
	const [search, setSearch] = useState<string>("")
	// const [query, setQuery] = useState<string>("chicken")

	const getData: any = useCallback(
		async (text: string) => {
			try {
				const index = Math.floor(Math.random() * 100)
				console.log(index)

				const response = await fetch(
					`https://api.edamam.com/search?q=${text}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${index}`
				)
				const data = await response.json()
				setRecipes(data.hits)
			} catch (e) {
				console.error(e)
			}
		},
		[APP_ID, APP_KEY]
	)

	useEffect(() => {
		getData("chicken")
	}, [getData])

	const handleChange = useCallback(e => {
		setSearch(e.target.value)
	}, [])

	const handleSubmit = useCallback(
		e => {
			e.preventDefault()
			getData(search)
			setSearch("")
		},
		[getData, search]
	)

	return (
		<>
			<form className='search' onSubmit={handleSubmit}>
				<input
					type='text'
					className='search__bar'
					value={search}
					onChange={handleChange}
				/>
				<button type='submit' className='search__btn'>
					Search
				</button>
			</form>
			<ul className='recipe'>
				{recipes.map(({ recipe }: any, i: number) => (
					<Recipe
						key={i}
						title={recipe.label}
						calories={recipe.calories}
						img={recipe.image}
						ingredients={recipe.ingredients}
					/>
				))}
			</ul>
		</>
	)
}

export default App

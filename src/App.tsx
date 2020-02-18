import React, { useState, useEffect, useCallback } from "react"
import Recipe from "./Recipe"

interface Props {}

const App: React.FC<Props> = () => {
	const APP_ID = "73009207"
	const APP_KEY = "7aada3a89e338f0b45ace18399f33978"

	const [recipes, setRecipes] = useState<[]>([])
	const [search, setSearch] = useState<string>("")
	const [query, setQuery] = useState<string>("chicken")

	const getData: any = useCallback(async () => {
		try {
			const response = await fetch(
				`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
			)
			const data = await response.json()
			setRecipes(data.hits)
		} catch (e) {
			console.error(e)
		}
	}, [query])

	useEffect(() => {
		getData()
	}, [getData])

	const handleChange = useCallback(e => {
		setSearch(e.target.value)
	}, [])

	const handleSubmit = useCallback(
		e => {
			e.preventDefault()
			setQuery(search)
			setSearch("")
		},
		[search]
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

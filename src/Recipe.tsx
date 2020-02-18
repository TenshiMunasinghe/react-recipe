import React, { useState, useCallback } from "react"

interface Props {
	title: string
	calories: number
	img: string
	ingredients: [{ text: string; weight: number }]
}

const Recipe: React.FC<Props> = ({ title, calories, img, ingredients }) => {
	const [showModal, setShowModal] = useState<boolean>(false)
	const handleModal = useCallback((show: boolean) => {
		setShowModal(show)
	}, [])

	return (
		<>
			<li className='recipe__item'>
				<h1 className='recipe__title'>{title}</h1>
				<div className='recipe__header-wrapper'>
					<div className='recipe__image'>
						<img src={img} alt={title} onClick={() => handleModal(true)} />
					</div>
					<div className='recipe__calorie'>
						Calories: {Math.floor(calories)}
					</div>
				</div>

				<ul className='recipe__ingredients'>
					{ingredients.map(({ text }, i) => (
						<li key={i} className='recipe__ingredients-item'>
							{text}
						</li>
					))}
				</ul>
			</li>
			<div
				className={`modal ${showModal ? "show" : "hide"}`}
				onClick={() => handleModal(false)}>
				<div className='modal__content'>
					<img src={img} alt={title} className='modal__image' />
				</div>
			</div>
		</>
	)
}

export default Recipe

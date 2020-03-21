import React, { useState, useCallback } from "react"
import styled, { css } from "styled-components"

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
            <RecipeItem>
                <Title>{title}</Title>
                <Wrapper>
                    <Figure>
                        <img
                            src={img}
                            alt={title}
                            onClick={() => handleModal(true)}
                        />
                    </Figure>
                    <p>Calories: {Math.floor(calories)}</p>
                </Wrapper>

                <IngredientsList>
                    {ingredients.map(({ text }, i) => (
                        <li key={i}>{text}</li>
                    ))}
                </IngredientsList>
            </RecipeItem>
            <Modal
                visibility={showModal ? "show" : "hide"}
                onClick={() => handleModal(false)}>
                <figure>
                    <img src={img} alt={title} />
                </figure>
            </Modal>
        </>
    )
}

const RecipeItem = styled.li`
    list-style-type: none;
    list-style-position: inside;
    display: grid;
    justify-content: space-evenly;
    background: #fff;
    padding: 1rem;
    box-shadow: 0.025rem 0.025rem 0.05rem 0 rgba(80, 80, 80, 0.295);
`

const Title = styled.h5`
    text-align: center;
    font-size: 1.25rem;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

const Figure = styled.figure`
    border-radius: 50%;
    height: 5rem;
    width: 5rem;
    margin: 0.5rem auto;

    img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
    }

    p {
        margin: auto;
    }
`

const IngredientsList = styled.ul`
    list-style-type: disc;
    list-style-position: outside;
    padding: 2rem;

    li {
        padding: 0.25rem;
    }
`

const Modal = styled.div<{ visibility: "show" | "hide" }>`
    display: flex;
    position: fixed;
    z-index: 999;
    height: 100vh;
    align-self: center;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #00000099;
    ${({ visibility }) =>
        visibility === "show"
            ? css`
                  animation: showModal 0.5s ease-in-out forwards;
                  justify-content: center;
                  align-items: center;
              `
            : css`
                  display: none;
              `}
`

export default Recipe

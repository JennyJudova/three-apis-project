/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function RecipesIndex() {
  const [recipes, setRecipes] = useState();
  const [errors, setErrors] = useState();

  const getData = () => {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/filter.php?i=egg')
      .then((res) => {
        console.log(res.data.meals);
        setRecipes(res.data.meals);
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2>All Recipes</h2>
      <div className="indexWrapper">
        {recipes &&
          recipes.map((recipe) => (
            <div key={recipe.idMeal}>
              <Link to={`/recipes/${recipe.idMeal}`}>
                <img
                  src={
                    recipe.strMealThumb
                      ? recipe.strMealThumb
                      : 'https://i.pinimg.com/originals/d1/b0/e2/d1b0e2ee4beb712ccff7065cb43f65ed.jpg'
                  }
                  alt="recipe"
                  height="100px"
                />
                <h3>{recipe.strMeal}</h3>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

{
  /* <div className="indexWrapper">
{allVillains &&
  allVillains.map((villain) => (
    <div key={villain._id}>
      <Link to={`/villains/${villain._id}`}>
        <img
          src={
            villain.image
              ? villain.image
              : 'https://i.pinimg.com/originals/d1/b0/e2/d1b0e2ee4beb712ccff7065cb43f65ed.jpg'
          }
          alt="villain portrait"
          height="100px"
        />
        <h3>{villain.username}</h3>
      </Link>
    </div>
  ))}
</div> */
}

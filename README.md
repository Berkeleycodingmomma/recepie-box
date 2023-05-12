# Recepie-Box
#
# 
#
## Description 
#
Unlock the Secrets of Flavorful Delights! With this intuitive app you will be able to search out countless recipes oranized by cusine type and save your favorites for easy access to top notch recipies from aroud the globe. 

#
## Beautiful Image
#

![plot](./assets/photo.png)

#
## Built With:
- JSON:[ JSON](https://www.npmjs.com/package/json)
- Dynamic JavaScript
- Node.js [Version 16.18.1](https://nodejs.org/en/blog/release/v16.18.1/)
- Express.js:[Express.js](https://expressjs.com/en/starter/installing.html)
- Bcryptjs: [2.4.3](https://www.npmjs.com/package/bcryptjs)
- Connect Session Store using Sequelize: [7.0.4](https://www.npmjs.com/package/connect-session-sequelize)
- Dotenv: [8.6.0](https://www.npmjs.com/package/dotenv)
- Express: [4.17.1](https://www.npmjs.com/package/express)
- Express Handlebars: [5.2.0](https://www.npmjs.com/package/express-handlebars)
- Express-Session: [1.17.1](https://www.npmjs.com/package/express-session)
- Handlebars.js: [4.7.6](https://www.npmjs.com/package/handlebars)
- Node MySql2: [2.3.3](https://www.npmjs.com/package/mysql2)
- Sequelize: [6.29.3](https://www.npmjs.com/package/sequelize)
- License Badge: [Shields.io](https://shields.io/)
- Visual Studio Code: [Website](https://code.visualstudio.com/)
- Heroku: [Website](https://id.heroku.com/login)
- Greensocks:  [Website](https://greensock.com/)
- Nodemon: [Website](https://www.npmjs.com/package/nodemon) 





## Code  Example


Below is a model table for mysql backend db creation

```Javascript

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class Favorite extends Model { }

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",

        unique: false

      },
    },
    recipe_id: { //foreign key
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'recipe',
        key: 'id',
        unique: false
      }

    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "favorite",
  }
);

module.exports = Favorite;

```

Below is the CSS for the homepage

``` CSS

#cuisine-list {
  list-style: none;
  padding: 0;
  width: 200px;
}

#cuisine-list li {
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

#cuisine-list li:hover {
  background-color: lightgray;
}

#cuisine-list li::before {
  content: '\25B6';
  margin-right: 5px;
}

.recipe-container {
  transition: background-color 0.3s;

}

.recipe-container:hover {
  border-right: 1em solid #656565;
  background-color: rgba(126, 126, 126, 0.2);
  border-radius: 0.5em;

}


body {
  background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgb(213 181 146) 100%),
    url(./images/dish-pick.png) center center no-repeat;
  background-size: cover;
}


``` 
This is the controller which deletes a favorite. It looks for auth, searches the db, deletes the favorite and cascades the changes to the rest of the table.  It has error handling and updates the page removing the favorite and the button.

```Javascript


router.delete('/:spoon_id', withAuth, async (req, res) => {
  const recipeData = await Recipe.findOne({ where: { spoon_id: req.body.spoon_id } });
  const recipe = recipeData.get({ plain: true });

  Favorite.destroy({
    where: {
      id: recipe.id,
      user_id: req.session.user_id,
    },
  })
    .then((recipeData) => {
      if (!recipeData) {
        res.status(404).json({ message: 'No favorite with this parameters' });
        return;
      }
      res.json(recipeData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

```


## Usage 

You just need to head on over to the deployed app at https://recipesbox.herokuapp.com/. Once you Sign Up you will be able to veiw recipes and save them to your favorites Dashboard.  


## Learning Points 


Learned so much, learned to work as a team, learned better git practices, learned to communnicate in a more effective manner.  Learned to manage disagreements.  Learned how to use GreenSock to animate, learned so many different ways to test and implement code.  We all worked super hard and are our proud of the product we were able to produce.  


## Authors Info

The Curiosity Crusaders!  Turning questions into Quality Code.

* [Github](https://github.com/LiubovSobolevskaya)
* [Github](https://github.com/Berkeleycodingmomma)
* [Github](https://github.com/bdalberson)
```

## Credits

Many thanks to everyone who helped get us across the line for this one.  And to all the teammates for working super hard and putting the project first.    

---

## Tests
Tested the UI and user cases,  ran functional testing integratin tests to verify quality and consistency. We didn't have any time to build any unit tests but that would be a next step for future development.  






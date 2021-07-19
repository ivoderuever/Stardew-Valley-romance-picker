<template>
  <div class="home">
    <header>
      <h1>Stardew Valley romance picker</h1>
    </header>
    <div class="content center">
        <div v-if="gender != null" class="randomized">
          <h2>A suggested romance partner:</h2>
          <div class="partner">
            <img :src="require(`../assets/${vilager.image}.png`)" alt="Vilager">
            <h2>{{ vilager.name }}</h2>
          </div>
          <button class="btn" @click="randomize()">Randomize</button>
          <button class="btn back-btn" @click="reset()">Back</button>
        </div>
        <div class="candidates" v-if="gender == null">
            <h2>Which group of candidates do you want to get randomized result from?</h2>
            <div class="gender-btn">
                <button class="btn" @click="type('all')">All</button>
                <button class="btn" @click="type(0)">Bachelors</button>
                <button class="btn" @click="type(1)">Bachelorettes</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //male = 0
      //female = 1
      //unknown = 2
      vilagers: [
        {
          name: "Alex",
          gender: 0,
          image: 1,
        },
        {
          name: "Elliott",
          gender: 0,
          image: 2,
        },
        {
          name: "Harvey",
          gender: 0,
          image: 3,
        },
        {
          name: "Sam",
          gender: 0,
          image: 4,
        },
        {
          name: "Sabastian",
          gender: 0,
          image: 5,
        },
        {
          name: "Shane",
          gender: 0,
          image: 6,
        },
        {
          name: "Abigail",
          gender: 1,
          image: 7,
        },
        {
          name: "Emily",
          gender: 1,
          image: 8,
        },
        {
          name: "Haley",
          gender: 1,
          image: 9,
        },
        {
          name: "Leah",
          gender: 1,
          image: 10,
        },
        {
          name: "Maru",
          gender: 1,
          image: 11,
        },
        {
          name: "Penny",
          gender: 1,
          image: 12,
        },
        {
          name: "Krobus",
          gender: 2,
          image: 13,
        },
      ],
      filteredArr: [],
      gender: null,
      vilager: {}
    };
  },
  methods: {
    type(type) {
      switch (type) {
        case 0:
          this.gender = 0;
          this.filteredArr = this.vilagers.filter(obj => obj.gender == this.gender);
          this.randomize();
          break;
        case 1:
          this.gender = 1;
          this.filteredArr = this.vilagers.filter(obj => obj.gender == this.gender);
          this.randomize();
          break;
        default:
          this.gender = 'all'
          this.filteredArr = this.vilagers;
          this.randomize();
          break;
      }
    },
    randomize() {
      let randomized = this.filteredArr[Math.floor(Math.random()*this.filteredArr.length)]
      if (this.vilager.name != randomized.name) {
        this.vilager = randomized; 
      } else {
        this.randomize();
      }
    },
    reset() {
      this.filteredArr = [];
      this.vilager = {};
      this.gender = null;
    }
  }
};
</script>

<style lang="scss">
header {
  padding: 10px 10px;
  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
  }
}

.home {
  height: 100vh;
  width: 100%;

    h2 {
        display: block;
        margin: 0;
        padding: 0 10px;
        text-align: center;
    }
  .candidates {
      padding: 10px 0px;
      .gender-btn {
          display: flex;
          justify-content: space-between;
          width: 300px;
          margin: 0 auto;
          padding: 10px 0px;
          display: flex;
      }
  }
  .randomized {
      padding: 10px 0px;

      .partner {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 20px;
        img {
          width: 150px;
          height: 150px;
          margin: 0 auto;
          padding: 10px;
          background: #FFD284;
          border: 4px solid #853605;
        }

        h2 {
          text-align: center;
          color: #454545;
          background: #FFD284;
          border: 4px solid #853605;
          margin: 0 auto;
          margin-top: 10px;
          border-radius: 5px;
          width: 200px;
        }
      }

      .btn {
        display: block;
        margin: 0 auto;
      }

      .back-btn {
        margin-top: 10px;
      }

  }

  .content {
    height: 80vh;
  }
  
}
</style>
<template>
  <div class="home">
    <header>
      <h1>Stardew Valley romance picker</h1>
    </header>
    <div class="content center">
        <div v-if="gender != null">

        </div>
        <div class="candidates" v-if="gender == null">
            <h2>Which group of candidates do you want to get randomized result from?</h2>
            <div class="gender-btn">
                <button class="btn">All</button>
                <button class="btn">Bachelors</button>
                <button class="btn">Bachelorettes</button>
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
        gender: null,
    };
  },
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
    }
  .candidates {
      padding: 10px 0px;
      padding-top: 300px;
      .gender-btn {
          display: flex;
          justify-content: space-between;
          width: 300px;
          margin: 0 auto;
      padding: 10px 0px;
          display: flex;
      }
  }
}
</style>
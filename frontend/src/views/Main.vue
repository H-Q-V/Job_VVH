<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import TaskBarMain from "@/components/Client/Header/TaskBarMain.vue";
import Banner from "@/components/Client/Header/Banner.vue";
import Search from "@/components/Client/Header/seach.vue";
import UrgentJobs from "@/components/Client/HomePage/UrgentJobs.vue";
import JobCategories from "@/components/Client/HomePage/JobCategories.vue";
import JobListings from "@/components/Client/HomePage/JobListings.vue";
import TopEmployers from "@/components/Client/HomePage/TopEmployers.vue";
import JobBestSalary from "@/components/Client/HomePage/JobBestSalary.vue";
import New from "@/components/Client/HomePage/New.vue";
import JdPage from "@/components/Client/jd-page/Jd-Page.vue";
import Story from "@/components/Client/Story/Story.vue";

// Tạo một ref để tham chiếu đến component UrgentJobs
const urgentJobsRef = ref(null);

// Phương thức để cập nhật danh sách công việc trong UrgentJobs
const handleUpdateJobs = (jobs) => {
  if (urgentJobsRef.value) {
    urgentJobsRef.value.updateJobsList(jobs);
  }
};
</script>

<template>
  <TaskBarMain />
  <Banner />
  <!-- <Search /> -->
  <Search @update-urgent-jobs="handleUpdateJobs" />
  <div class="container">
    <div class="row">
      <!-- <UrgentJobs class="col-md-8" /> -->
      <UrgentJobs ref="urgentJobsRef" class="col-md-8" />
      <JobCategories class="col-md-4" />
    </div>
    <div class="row">
      <JobListings class="col-md-12" />
    </div>
  </div>
  <TopEmployers></TopEmployers>
  <JobBestSalary></JobBestSalary>
  <New></New>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

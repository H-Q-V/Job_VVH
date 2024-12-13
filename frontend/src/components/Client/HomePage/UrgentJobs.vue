<template>
  <div class="col-md-8 col-sm-12 col-12">
    <div class="job-board-wrap">
      <h2 class="widget-title">
        <span>Tuyển gấp</span>
      </h2>

      <div class="job-group" @scroll="handleScroll">
        <div
          v-for="(job, index) in urgentJobs"
          :key="job._id"
          class="job pagi"
          @click="openJdPage(job)"
        >
          <div class="job-content">
            <div class="job-logo">
              <a :href="job.companyLink">
                <img
                  :src="job.logo"
                  class="job-logo-ima"
                  :alt="job.company + ' logo'"
                />
              </a>
            </div>

            <div class="job-desc">
              <div class="job-title">
                <a :href="job.link">{{ job.title }}</a>
              </div>
              <div class="job-company">
                <a :href="job.companyLink">công ty : {{ job.company }}</a> |
                <a :href="job.link" class="job-address">
                  <i class="fa fa-map-marker" aria-hidden="true"></i>
                  địa chỉ : {{ job.location }}
                </a>
              </div>

              <div class="job-inf">
                <div class="job-main-skill">
                  <span class="programmingLanguages-label">Ngôn ngữ:</span>
                  <div class="programmingLanguages-container">
                    <span
                      v-for="(language, index) in job.programmingLanguages"
                      :key="index"
                      class="programmingLanguages-value"
                    >
                      {{ language }}
                    </span>
                  </div>
                </div>

                <div class="job-salary">
                  <i class="fa fa-money" aria-hidden="true"></i>
                  <span class="salary">Giá: {{ job.salary }}</span>
                </div>
                <div class="job-deadline">
                  <span
                    ><i class="fa fa-clock-o" aria-hidden="true"></i> Hạn
                    nộp:15/01/2019</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import { useRouter } from "vue-router";

export default {
  name: "UrgentJobs",
  components: {
    SlickCarousel,
  },
  data() {
    return {
      urgentJobs: [],
      displayedCount: 4,
    };
  },
  setup() {
    const router = useRouter();

    const openJdPage = (job) => {
      if (job && job._id) {
        router.push({
          name: "jd-page",
          params: { id: job._id.toString() },
          state: { jobDetails: job },
        });
      } else {
        console.error("Job or Job ID is undefined", job);
      }
    };

    return { openJdPage };
  },
  async created() {
    await this.fetchUrgentJobs();
  },
  computed: {
    displayedJobs() {
      return this.urgentJobs.slice(0, this.displayedCount);
    },
  },
  methods: {
    async fetchUrgentJobs() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/jobs/urgent"
        );
        // Sắp xếp theo ID (nếu ID có tính thời gian)
        this.urgentJobs = response.data.data.sort((a, b) => {
          return b._id.localeCompare(a._id);
        });
      } catch (error) {
        console.error("Error fetching urgent jobs:", error);
      }
    },
    handleScroll(event) {
      const element = event.target;

      if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
        this.loadMoreJobs();
      }
    },
    loadMoreJobs() {
      if (this.displayedCount < this.urgentJobs.length) {
        this.displayedCount += 3;
      }
    },
    updateJobsList(jobs) {
      this.urgentJobs = jobs.filter((job) => job.isUrgent);
      this.displayedCount = 4;
    },
  },
};
</script>

<style scoped>
.job-board-wrap {
  margin-top: 30px;
}

.job-group {
  max-height: 500px;
  overflow-y: auto;
}

.job-content {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eaeaea;
  cursor: pointer;
}

.job-content:hover {
  background-color: #f9f9f9;
}

.job-logo {
  width: 80px;
  margin-right: 15px;
}

.job-logo-ima {
  width: 100%;
  height: auto;
}

.job-desc {
  flex: 1;
}

.job-title {
  margin-bottom: 5px;
}

.job-title a {
  font-weight: bold;
  color: #333;
  text-decoration: none;
  font-size: 16px;
}

.job-company {
  margin-bottom: 5px;
}

.job-inf {
  display: grid;
  grid-template-columns: 200px 150px auto;
  gap: 10px;
  align-items: center;
}

.job-main-skill,
.job-salary,
.job-deadline {
  white-space: nowrap;
}

.job-main-skill i,
.job-salary i,
.job-deadline i {
  margin-right: 5px;
  width: 15px;
  text-align: center;
}

.job-address {
  color: #666;
  text-decoration: none;
}

.job-address i {
  margin-right: 5px;
}
.job-main-skill {
  display: flex;
  align-items: center;
  gap: 5px;
}

.programmingLanguages-label {
  color: #666;
}

.programmingLanguages-value {
  background-color: #e8f0fe;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid #c6d8f7;
  font-size: 0.9em;
  font-size: 0.9em;
  color: #1a73e8;
  white-space: nowrap;
}
.programmingLanguages-value:hover {
  background-color: #d4e4fd;
  border-color: #a1c2f9;
}
.job-inf {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 20px;
  align-items: center;
}

/* Đảm bảo các phần tử không bị xuống dòng */
.job-main-skill,
.job-salary,
.job-deadline {
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>

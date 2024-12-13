<!-- <template>
  <div class="job-sidebar">
    <h2 class="widget-title">
      <span>Ngành Nghề</span>
    </h2>
    <div class="job-list">
      <div class="catelog-list">
        <ul class="job-list-category" id="jobCategories">
          <li v-for="category in jobCategories" :key="category.id">
            <a :href="category.link">
              <span class="cate-img">
                <em>{{ category.name }}</em>
              </span>
              <span class="cate-count">({{ category.count }})</span>
            </a>
          </li>
        </ul>
        <div class="readmorestyle-wrap">
          <a href="#" class="readallstyle reads1" id="readMoreLink" @click.prevent="toggleReadMore">Xem thêm<i class="fa fa-angle-down pl-2"></i></a>
          <a href="#" class="readallstyle reads1" id="readLessLink" style="display: none;" @click.prevent="toggleReadMore">Rút gọn<i class="fa fa-angle-up pl-2"></i></a>
        </div>
      </div>
    </div>
        <div class="sb-banner">
          <img src="@/assets/img/ads1.jpg" class="advertisement">
        </div>
      </div>
    

</template>

<script>
export default {
  data() {
    return {
      jobCategories: [
        { id: 1, name: 'Lập trình viên', count: 1100, link: '#' },
        { id: 2, name: 'Nhân viên kiểm thử', count: 230, link: '#' },
        { id: 3, name: 'Kỹ sư cầu nối', count: 110, link: '#' },
        { id: 4, name: 'Designer', count: 2300, link: '#' },
        { id: 5, name: 'Product Manager', count: 99, link: '#' },
        { id: 6, name: 'HR', count: 300, link: '#' },
      ],
      isExpanded: false,
    };
  },
  methods: {
    toggleReadMore() {
      this.isExpanded = !this.isExpanded;
      const jobList = document.getElementById('jobCategories');
      const readMoreLink = document.getElementById('readMoreLink');
      const readLessLink = document.getElementById('readLessLink');

      if (this.isExpanded) {
        jobList.style.maxHeight = 'none'; 
        readMoreLink.style.display = 'none'; 
        readLessLink.style.display = 'inline'; 
      } else {
        jobList.style.maxHeight = '150px'; 
        readMoreLink.style.display = 'inline'; 
        readLessLink.style.display = 'none'; 
      }
    },
  },
  mounted() {
    const jobList = document.getElementById('jobCategories');
    jobList.style.maxHeight = '150px'; 
  },
};
</script>

<style scoped>
.job-sidebar {
  background: #fff;
  padding: 15px;
  border-radius: 3px;
  margin-bottom: 1rem;
  margin-top: 30px;
}

.widget-title {
  margin-bottom: 15px;
}

.widget-title span {
  font-family: Roboto, Arial, sans-serif;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: #3a3a3a;
  font-weight: 500;
}

.job-list-category {
  list-style-type: none;
  padding: 0;
  overflow: hidden; 
  transition: max-height 0.3s ease;
  max-height: 150px;
}

.job-list-category li {
  margin-bottom: 10px;
}

.job-list-category li a {
  color: #333;
  font-size: 0.975rem;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
}

.job-list-category li a:hover {
  color: #28a745;
}

.job-category-count {
  color: #999;
  font-size: 0.9rem;
}
</style> -->

<template>
  <div class="job-sidebar">
    <h2 class="widget-title">
      <span>Địa điểm tuyển dụng</span>
    </h2>
    <div class="job-list">
      <div class="catelog-list">
        <div class="scroll-container">
          <ul
            class="job-list-category"
            id="jobCategories"
            ref="locationContainer"
            @scroll="handleScroll"
          >
            <li v-for="location in displayedLocations" :key="location.location">
              <a @click.prevent="selectLocation(location)" href="#">
                <span class="cate-img">
                  <i class="fa fa-map-marker"></i>
                  <em>{{ location.location }}</em>
                </span>
                <span class="cate-count">({{ location.count }})</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="sb-banner">
      <img src="@/assets/img/ads1.jpg" class="advertisement" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted } from "vue";

import SlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
export default {
  name: "JobCategories",
  components: {
    SlickCarousel,
  },
  data() {
    return {
      locations: [],
      displayedCount: 4,
    };
  },
  setup() {
    const locations = ref([]);
    const locationContainer = ref(null);
    const displayedCount = ref(10); // Số lượng hiển thị ban đầu

    // Computed property để lấy số lượng địa điểm hiển thị
    const displayedLocations = computed(() => {
      return locations.value.slice(0, displayedCount.value);
    });

    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/jobs/locations"
        );
        locations.value = response.data.data;
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const handleScroll = (event) => {
      const element = event.target;
      const nearBottom =
        element.scrollTop + element.clientHeight >= element.scrollHeight - 50;

      if (nearBottom && displayedCount.value < locations.value.length) {
        loadMore();
      }
    };

    const loadMore = () => {
      displayedCount.value += 3; // Load thêm 3 địa điểm mỗi lần scroll
    };

    const selectLocation = (location) => {
      console.log("Selected location:", location);
      // Thêm logic xử lý khi chọn địa điểm
    };

    onMounted(() => {
      fetchLocations();
    });

    return {
      displayedLocations,
      locationContainer,
      selectLocation,
      handleScroll,
    };
  },
};
</script>

<style scoped>
/* Giữ nguyên CSS cũ */
.job-sidebar {
  background: #fff;
  padding: 15px;
  border-radius: 3px;
  margin-bottom: 1rem;
  margin-top: 30px;
}

.widget-title {
  margin-bottom: 15px;
}

.widget-title span {
  font-family: Roboto, Arial, sans-serif;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: #3a3a3a;
  font-weight: 500;
}

.scroll-container {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.job-list-category {
  list-style-type: none;
  padding: 0;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.job-list-category::-webkit-scrollbar {
  width: 6px;
}

.job-list-category::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.job-list-category::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.job-list-category::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.job-list-category li {
  margin-bottom: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
}

.job-list-category li a {
  color: #333;
  font-size: 0.975rem;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
}

.job-list-category li a:hover {
  color: #1a73e8;
  transform: translateX(5px);
}

.cate-img {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cate-img i {
  color: #1a73e8;
  font-size: 14px;
}

.cate-count {
  color: #666;
  font-size: 0.9rem;
}

.advertisement {
  width: 100%;
  margin-top: 20px;
  border-radius: 3px;
}
</style>

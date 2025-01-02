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
    <div class="modal" v-if="isModalVisible">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ selectedLocation.location }}</h2>
        <p>Số lượng bài tuyển dụng: {{ selectedLocation.count }}</p>

        <!-- Bảng hiển thị danh sách công việc -->
        <table class="job-table">
          <thead>
            <tr>
              <th>Tên công việc</th>
              <th>Ngôn ngữ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="job in jobs" :key="job.id">
              <td>{{ job.title }}</td>
              <td>{{ job.programmingLanguages.join(", ") }}</td>
            </tr>
            <tr v-if="jobs.length === 0">
              <td colspan="2" style="text-align: center">
                Không có công việc nào.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
  setup() {
    const locations = ref([]);
    const locationContainer = ref(null);
    const displayedCount = ref(10);
    const isModalVisible = ref(false);
    const selectedLocation = ref({});
    const jobs = ref([]); // Danh sách công việc

    const displayedLocations = computed(() => {
      return locations.value.slice(0, displayedCount.value);
    });

    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://job-api.mrun.site/api/jobs/locations"
        );
        locations.value = response.data.data;
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const fetchJobsByLocation = async (location) => {
      try {
        const response = await axios.get(
          `https://job-api.mrun.site/api/jobs/search?location=${location}`
        );
        jobs.value = response.data.data; // Cập nhật danh sách công việc
      } catch (error) {
        console.error("Error fetching jobs:", error);
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
      displayedCount.value += 3;
    };

    const selectLocation = (location) => {
      selectedLocation.value = location;
      isModalVisible.value = true;
      fetchJobsByLocation(location.location); // Gọi hàm để fetch jobs ở đây
    };

    const closeModal = () => {
      isModalVisible.value = false;
      jobs.value = []; // Xóa danh sách công việc khi đóng modal
    };

    onMounted(() => {
      fetchLocations();
    });

    return {
      displayedLocations,
      locationContainer,
      selectLocation,
      handleScroll,
      isModalVisible,
      selectedLocation,
      closeModal,
      jobs, // Trả về danh sách công việc
    };
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

/* Styles for modal */
.modal {
  display: flex;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7); /* Màu nền tối hơn */
}

.modal-content {
  background-color: #ffffff; /* Màu nền trắng */
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 10px; /* Bo góc cho modal */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Hiệu ứng bóng */
  transform: translateZ(0); /* Tạo hiệu ứng 3D */
  transition: transform 0.3s ease; /* Hiệu ứng chuyển động */
}

.modal-content h2 {
  color: #007bff; /* Màu chữ xanh biển */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* Hiệu ứng bóng cho chữ */
}

.modal-content p {
  color: #333; /* Màu chữ tối */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #1a73e8; /* Màu chữ khi hover */
  text-decoration: none;
  cursor: pointer;
}

/* Styles for job table */
.job-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.job-table th,
.job-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.job-table th {
  background-color: #007bff;
  color: white;
}

.job-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.job-table tr:hover {
  background-color: #ddd;
}
</style>

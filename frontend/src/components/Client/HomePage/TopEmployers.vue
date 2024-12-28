<template>
  <div class="container-fluid">
    <div class="container top-employer">
      <div class="row">
        <div class="col-md-12 top-employer-contain">
          <div class="header">
            <h3>Nhà tuyển dụng hàng đầu</h3>
          </div>
          <div class="row">
            <div
              class="col-md-3 col-sm-6 col-12 top-employer-wrap"
              v-for="employer in employers"
              :key="employer.id"
            >
              <div class="top-employer-item" @click="openModal(employer)">
                <a href="#">
                  <div class="emp-img-thumb">
                    <img :src="employer.logo" alt="Logo">
                  </div>
                  <h3 class="company">{{ employer.company }}</h3>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" v-if="isModalVisible">
  <div class="modal-content">
    <span class="close" @click="closeModal">&times;</span>
    <div class="modal-header">
      <img :src="selectedEmployer.logo" alt="Logo" class="modal-logo" />
      <h2>{{ selectedEmployer.company }}</h2>
    </div>
    <div class="modal-body">
      <p>
        <strong>Thông tin công ty:</strong>
      </p>
      <p>
        Một trong những công ty thành viên của Tập đoàn FPT là FPT Software, hiện là công ty xuất khẩu dịch vụ phần mềm có mặt tại 11 quốc gia trên thế giới và lớn nhất Đông Nam Á.
      </p>
      <p>
        Đặt tại Việt Nam 3 trụ sở chính FPT Software, và một số nước trên toàn thế giới như Malaysia, Đức, Úc, Nhật Bản, Hoa Kỳ, Singapore, Malaysia, Thái Lan và Philipines.
      </p>
      <p>
        Được thành lập từ năm 1988, hiện FPT Software đáp ứng nhu cầu tại 20 quốc gia lớn nhất trên thế giới với hơn 150 công ty hàng đầu như Hitachi, NEOPOST, Petronas, Deutsche Bank, và Unilever có khi đạt cả 1 triệu USD với hơn 4000 nhân viên trên toàn thế giới.
      </p>
      
    </div>
  </div>
</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  name: 'TopEmployers',
  setup() {
    const employers = ref([]);
    const isModalVisible = ref(false);
    const selectedEmployer = ref({});

    const fetchEmployers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/jobs/getAll'); 
    const uniqueEmployers = [];
    const seen = new Set();

    response.data.data.forEach((employer) => {
      const uniqueKey = employer.id || employer.company; 
      if (!seen.has(uniqueKey) && uniqueEmployers.length < 8 ) {
        seen.add(uniqueKey);
        uniqueEmployers.push(employer);
      }
    });

    employers.value = uniqueEmployers; 
  } catch (error) {
    console.error('Error fetching top employers:', error);
  }
};


    const openModal = (employer) => {
      selectedEmployer.value = employer;
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
      selectedEmployer.value = {};
    };

    onMounted(() => {
      fetchEmployers();
    });

    return {
      employers,
      isModalVisible,
      selectedEmployer,
      openModal,
      closeModal,
    };
  },
};
</script>

<style scoped>
.top-employer-item {
  background: #fefefe;
  height: 220px;
  overflow: hidden;
  margin-bottom: 16px;
  border-radius: 8px; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s; 
}

.top-employer-wrap {
  padding: 8px;
}

.emp-img-thumb {
  height: 130px;
  overflow: hidden;
  width: 100%;
  display: block;
  padding: 10px;
  text-align: center;
}

.emp-img-thumb img {
  width: 100%; 
  height: auto;
  border-radius: 8px; 
}

.top-employer-item .company {
  font-weight: 500;
  font-size: 16px; /* Tăng kích thước chữ */
  width: 100%;
  text-align: center;
  display: block;
  margin-top: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* Đổ bóng cho chữ */
}

.top-employer-contain .header h3 {
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 22px; /* Tăng kích thước tiêu đề */
  text-transform: uppercase;
  font-weight: 600; /* Tăng độ đậm */
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
  display: flex;
  flex-direction: column; /* Sắp xếp theo cột */
}
.modal-header {
  display: flex;
  align-items: center; /* Căn giữa theo chiều dọc */
  margin-bottom: 15px; /* Khoảng cách dưới */
}

.modal-logo {
  width: 80px; /* Kích thước tối đa cho logo */
  height: auto;
  margin-right: 15px; /* Khoảng cách bên phải */
}
.modal-header h2 {
  font-size: 24px; /* Kích thước chữ tiêu đề */
  color: #007bff; /* Màu chữ xanh biển */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* Hiệu ứng bóng cho chữ */
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
.modal-body {
  color: #333; /* Màu chữ tối */
  line-height: 1.6; /* Khoảng cách giữa các dòng */
}
.modal-content h2 {
  color: #007bff; /* Màu chữ xanh biển */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* Hiệu ứng bóng cho chữ */
}

.modal-content p {
  color: #333; /* Màu chữ tối */
}



.modal-logo {
  width: 100%;
  max-width: 100px; /* Kích thước tối đa cho logo */
  height: auto;
}
</style>
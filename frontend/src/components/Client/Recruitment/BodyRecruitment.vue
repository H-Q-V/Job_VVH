<template>
  <div class="container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="home-ads">
            <a href="#">
              <img :src="imgbanner" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="accordion" id="accordionExample">
    <div class="card recuitment-card">
      <div class="card-header recuitment-card-header" id="headingOne">
        <h2 class="mb-0">
          <a
            class="btn btn-link btn-block text-left recuitment-header"
            type="button"
            data-toggle="collapse"
            data-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Đăng tin tuyển dụng
            <span id="clickc1_advance2" class="clicksd">
              <i class="fa fa fa-angle-up"></i>
            </span>
          </a>
        </h2>
      </div>

      <div
        id="collapseOne"
        class="collapse show"
        aria-labelledby="headingOne"
        data-parent="#accordionExample"
      >
        <div class="card-body recuitment-body">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label text-right label"
              >Title<span style="color: red" class="pl-2">*</span></label
            >
            <div class="col-sm-9">
              <input
                v-model="title"
                type="text"
                class="form-control"
                placeholder="Nhập tiêu đề"
                :class="{ 'is-invalid': errors.title }"
              />
              <div v-if="errors.title" class="invalid-feedback">
                {{ errors.title }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label text-right label"
              >Company<span style="color: red" class="pl-2">*</span></label
            >
            <div class="col-sm-9">
              <textarea
                v-model="company"
                type="text"
                class="form-control"
                placeholder="Nhập tên công ty"
                rows="5"
                :class="{ 'is-invalid': errors.company }"
              ></textarea>
              <div v-if="errors.company" class="invalid-feedback">
                {{ errors.company }}
              </div>
            </div>
          </div>
          <div class="form-group row">
          <label class="col-sm-3 col-form-label text-right label">Location<span style="color: red" class="pl-2">*</span></label>
            <div class="col-sm-9">
      <!-- Thay thế textarea bằng select -->
            <select v-model="location" class="form-control">
              <option value="">Chọn địa điểm</option>
              <option v-for="province in provinces" 
                :key="province.code" 
                :value="province.name">
            {{ province.name }}
          </option>
        </select>
      </div>
     </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label text-right label"
              >Salary<span style="color: red" class="pl-2">*</span></label
            >
            <div class="col-sm-9">
              <textarea
                v-model="salary"
                type="text"
                class="form-control"
                placeholder="Nhập mức lương"
                rows="5"
                :class="{ 'is-invalid': errors.salary }"
              ></textarea>
              <div v-if="errors.salary" class="invalid-feedback">
                {{ errors.salary }}
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label text-right label"
              >Logo<span style="color: red" class="pl-2">*</span></label
            >
            <div class="col-sm-9">
              <div id="drop-area" :class="{ 'is-invalid': errors.logo }">
                <input
                  type="file"
                  id="fileElem"
                  multiple
                  accept="image/*"
                  @change="handleFiles($event.target.files)"
                />
                <label style="cursor: pointer" for="fileElem"
                  >Tải ảnh lên hoặc kéo thả vào đây</label
                >

                <progress
                  id="progress-bar"
                  max="100"
                  :value="uploadProgress"
                  v-show="uploadProgress > 0 && uploadProgress < 100"
                ></progress>

                <div id="gallery">
                  <img
                    v-for="(img, index) in gallery"
                    :src="img"
                    :key="index"
                    class="preview-image"
                  />
                </div>
              </div>
              <div v-if="errors.logo" class="invalid-feedback d-block">
                {{ errors.logo }}
              </div>
            </div>
          </div>
         <!-- Phần Benefits -->
  <div class="form-group row">
    <label class="col-sm-3 col-form-label text-right label">Benefits<span style="color: red" class="pl-2">*</span></label>
    <div class="col-sm-9">
      <div class="benefits-container">
        <div v-for="(benefit, index) in benefitsArray" :key="index" class="benefit-item">
          <div class="benefit-input-group">
            <input 
              v-model="benefitsArray[index]" 
              type="text" 
              class="form-control"
              placeholder="Nhập lợi ích"
            />
            <button @click="removeBenefit(index)" class="btn-remove">×</button>
          </div>
        </div>
        <button @click="addBenefit" class="btn-add">+ Thêm lợi ích</button>
      </div>
    </div>
          </div>
        </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label text-right label"
              >Job Description<span style="color: red" class="pl-2"
                >*</span
              ></label
            >
            <div class="col-sm-9">
              <textarea
                v-model="obDescription"
                type="text"
                class="form-control"
                placeholder="Nhập mô tả công việc"
                rows="5"
                :class="{ 'is-invalid': errors.obDescription }"
              ></textarea>
              <div v-if="errors.obDescription" class="invalid-feedback">
                {{ errors.obDescription }}
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label text-right label"
              >Job Request<span style="color: red" class="pl-2">*</span></label
            >
            <div class="col-sm-9">
              <textarea
                v-model="jobRequest"
                type="text"
                class="form-control"
                placeholder="Nhập yêu cầu công việc"
                rows="5"
                :class="{ 'is-invalid': errors.jobRequest }"
              ></textarea>
              <div v-if="errors.jobRequest" class="invalid-feedback">
                {{ errors.jobRequest }}
              </div>
            </div>
          </div>
          <div class="form-group row">
 <!-- Phần Languages -->
 <div class="form-group row">
    <label class="col-sm-3 col-form-label text-right label">Languages<span style="color: red" class="pl-2">*</span></label>
    <div class="col-sm-9">
      <div class="languages-container">
        <div v-for="(language, index) in languagesArray" :key="index" class="language-item">
          <div class="language-input-group">
            <input 
              v-model="languagesArray[index]" 
              type="text" 
              class="form-control"
              placeholder="Nhập ngôn ngữ lập trình"
            />
            <button @click="removeLanguage(index)" class="btn-remove">×</button>
          </div>
        </div>
        <button @click="addLanguage" class="btn-add">+ Thêm ngôn ngữ</button>
      </div>
    </div>
  </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label text-right label"
              >Tuyển gấp</label
            >
            <div class="col-sm-9">
              <input type="checkbox" v-model="isUrgent" />
            </div>
          </div>
          <div class="rec-submit">
            <button
              type="submit"
              class="btn-submit-recuitment"
              :disabled="loading"
              @click.prevent="fetchcreate"
            >
              <i class="fa fa-floppy-o pr-2"></i>
              <span v-if="loading">Đang lưu...</span>
              <span v-else>Lưu Tin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive,onMounted } from "vue";
import imgbanner from "@/assets/img/hna2.jpg";

const uploadProgress = ref(0);
const gallery = ref([]);
const title = ref("");
const company = ref("");
const location = ref("");
const salary = ref("");
const benefitsArray = ref(['']);
const obDescription = ref("");
const jobRequest = ref("");
const languagesArray = ref(['']);
const logoUrl = ref("");
const selectedFile = ref(null);
const token = ref(localStorage.getItem("token"));
const loading = ref(false);
const isUrgent = ref(false);
const provinces = ref([]);

const errors = reactive({
  title: "",
  company: "",
  location: "",
  salary: "",
  benefits: "",
  obDescription: "",
  jobRequest: "",
  languages: "",
  logo: "",
});


const addBenefit = () => {
  benefitsArray.value.push('');
};

const removeBenefit = (index) => {
  if (benefitsArray.value.length > 1) {
    benefitsArray.value.splice(index, 1);
  }
};

// Thêm các hàm xử lý languages
const addLanguage = () => {
  languagesArray.value.push('');
};

const removeLanguage = (index) => {
  if (languagesArray.value.length > 1) {
    languagesArray.value.splice(index, 1);
  }
};


const clearErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });
};
onMounted(async () => {
  try {
    const res = await fetch("https://api.mysupership.vn/v1/partner/areas/province");
    const data = await res.json();
    provinces.value = data.results;
  } catch (error) {
    console.error("Error fetching provinces:", error);
  }
});

const validateForm = () => {
  clearErrors();
  let isValid = true;

  if (!title.value.trim()) {
    errors.title = "Vui lòng nhập tiêu đề";
    isValid = false;
  }

  if (!company.value.trim()) {
    errors.company = "Vui lòng nhập tên công ty";
    isValid = false;
  }

  if (!location.value.trim()) {
    errors.location = "Vui lòng nhập địa điểm";
    isValid = false;
  }

  if (!salary.value.trim()) {
    errors.salary = "Vui lòng nhập mức lương";
    isValid = false;
  }

  if (benefitsArray.value.every(benefit => !benefit.trim())) {
    errors.benefits = "Vui lòng nhập quyền lợi";
    isValid = false;
  }

  if (!obDescription.value.trim()) {
    errors.obDescription = "Vui lòng nhập mô tả công việc";
    isValid = false;
  }

  if (!jobRequest.value.trim()) {
    errors.jobRequest = "Vui lòng nhập yêu cầu công việc";
    isValid = false;
  }

  if (languagesArray.value.every(language => !language.trim())) {
    errors.languages = "Vui lòng nhập ngôn ngữ lập trình";
    isValid = false;
  }

  if (!selectedFile.value) {
    errors.logo = "Vui lòng tải lên logo công ty";
    isValid = false;
  }

  return isValid;
};

const handleFiles = (files) => {
  gallery.value = [];
  uploadProgress.value = 0;

  Array.from(files).forEach((file) => {
    selectedFile.value = file;
    const fileURL = URL.createObjectURL(file);
    gallery.value.push(fileURL);
    logoUrl.value = fileURL;
    errors.logo = ""; // Clear logo error when file is selected

    const interval = setInterval(() => {
      if (uploadProgress.value < 100) {
        uploadProgress.value += 10;
      } else {
        clearInterval(interval);
      }
    }, 100);
  });
};

const fetchcreate = async () => {
  if (!validateForm()) {
    return;
  }

  loading.value = true;
  try {
    const check = await fetch("http://localhost:3000/api/payos/coin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    const checkcoins = await check.json();
    if (checkcoins.data.coins < 2000) {
      alert("Phải nạp đủ tiền mới có thể đăng bài!");
      return;
    }

    // Lọc các giá trị rỗng
    const filteredBenefits = benefitsArray.value.filter(b => b.trim());
    const filteredLanguages = languagesArray.value.filter(l => l.trim());

    // Tạo object data trước
    const jobData = {
      title: title.value,
      company: company.value,
      location: location.value,
      salary: salary.value,
      benefits: filteredBenefits,  // Gửi trực tiếp mảng
      programmingLanguages: filteredLanguages,  // Gửi trực tiếp mảng
      jobDescription: obDescription.value,
      jobRequest: jobRequest.value,
      isUrgent: isUrgent.value
    };

    // Tạo FormData và thêm file
    const formData = new FormData();
    formData.append("logo", selectedFile.value);
    
    // Thêm các trường dữ liệu khác dưới dạng JSON string
    Object.keys(jobData).forEach(key => {
      if (key === 'benefits' || key === 'programmingLanguages') {
        formData.append(key, JSON.stringify(jobData[key]));
      } else {
        formData.append(key, jobData[key]);
      }
    });

    const response = await fetch("http://localhost:3000/api/jobs/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    alert("Đăng tin thành công!");
  } catch (error) {
    console.error("Error:", error);
    alert("Có lỗi xảy ra khi đăng tin!");
  } finally {
    loading.value = false;
  }
};

</script>

<style scoped>
#gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.preview-image {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 5px;
}

#progress-bar {
  width: 100%;
  height: 10px;
  margin-top: 10px;
  display: block;
}

/* Thêm style cho validation */
.invalid-feedback {
  display: block;
  color: #dc3545;
  font-size: 0.875em;
  margin-top: 0.25rem;
}

.is-invalid {
  border-color: #dc3545;
}
.d-flex {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.ml-2 {
  margin-left: 0.5rem;
}
.benefits-container,
.languages-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.benefit-item,
.language-item {
  width: 100%;
}

.benefit-input-group,
.language-input-group {
  display: flex;
  gap: 8px;
  align-items: center;
}
.btn-remove {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
}

.btn-add {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  margin-top: 8px;
}

.btn-remove:hover {
  background-color: #c82333;
}
.btn-add:hover {
  background-color: #218838;
}

.form-control {
  flex: 1;
}
</style>

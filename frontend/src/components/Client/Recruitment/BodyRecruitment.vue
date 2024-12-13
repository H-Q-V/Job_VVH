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
            <label class="col-sm-3 col-form-label text-right label"
              >Location<span style="color: red" class="pl-2">*</span></label
            >
            <div class="col-sm-9">
              <textarea
                v-model="location"
                type="text"
                class="form-control"
                placeholder="Nhập địa điểm"
                rows="5"
                :class="{ 'is-invalid': errors.location }"
              ></textarea>
              <div v-if="errors.location" class="invalid-feedback">
                {{ errors.location }}
              </div>
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
          <div class="form-group row">
            <label class="col-sm-3 col-form-label text-right label"
              >Benefits<span style="color: red" class="pl-2">*</span></label
            >
            <div class="col-sm-9">
              <textarea
                v-model="benefits"
                type="text"
                class="form-control"
                placeholder="Nhập quyền lợi"
                rows="5"
                :class="{ 'is-invalid': errors.benefits }"
              ></textarea>
              <div v-if="errors.benefits" class="invalid-feedback">
                {{ errors.benefits }}
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
            <label class="col-sm-3 col-form-label text-right label"
              >Languages<span style="color: red" class="pl-2">*</span></label
            >
            <div class="col-sm-9">
              <textarea
                v-model="languages"
                type="text"
                class="form-control"
                placeholder="Nhập ngôn ngữ lập trình"
                rows="5"
                :class="{ 'is-invalid': errors.languages }"
              ></textarea>
              <div v-if="errors.languages" class="invalid-feedback">
                {{ errors.languages }}
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
import { ref, reactive } from "vue";
import imgbanner from "@/assets/img/hna2.jpg";

const uploadProgress = ref(0);
const gallery = ref([]);
const title = ref("");
const company = ref("");
const location = ref("");
const salary = ref("");
const benefits = ref("");
const obDescription = ref("");
const jobRequest = ref("");
const languages = ref("");
const logoUrl = ref("");
const selectedFile = ref(null);
const token = ref(localStorage.getItem("token"));
const loading = ref(false);
const isUrgent = ref(false);
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

const clearErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });
};

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

  if (!benefits.value.trim()) {
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

  if (!languages.value.trim()) {
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

    const formData = new FormData();
    formData.append("logo", selectedFile.value);
    formData.append("title", title.value);
    formData.append("company", company.value);
    formData.append("location", location.value);
    formData.append("salary", salary.value);
    formData.append("benefits", benefits.value);
    formData.append("jobDescription", obDescription.value);
    formData.append("jobRequest", jobRequest.value);
    formData.append("programmingLanguages", languages.value);
    formData.append("isUrgent", isUrgent.value);
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
</style>

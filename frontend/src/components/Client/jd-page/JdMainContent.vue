<template>
  <div class="col-md-8 col-sm-12 col-12 clear-left">
    <div class="main-wrapper">
      <h2 class="widget-title">
        <span>Phúc lợi</span>
      </h2>

      <div class="welfare-wrap">
    <div class="row">
      <div class="welfare-list">
        <ul>
          <li v-for="(benefit, index) in jobDetails.benefits" :key="index">
            <div class="benefit-item">
              <i class="fa fa-check-circle"></i>
              <span>{{ benefit }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  


      <h2 class="widget-title">
        <span>Mô tả công việc</span>
      </h2>
      <div class="jd-content" v-html="jobDetails.jobDescription"></div>
      <h2 class="widget-title">
        <span>Yêu cầu công việc</span>
      </h2>
      <div class="jd-content" v-html="jobDetails.jobRequest"></div>
    </div>
    <div>
      <div class="input-group frm1">
        <input
          v-model="comments"
          type="text"
          placeholder="Nhập bình luận của bạn"
          class="newsletter-email form-control"
          style="height: auto"
          @keyup.enter="createComment"
        />
        <a class="input-group-addon" @click.prevent="createComment">
          <i class="fa fa-share" aria-hidden="true"></i>
        </a>
      </div>
    </div>

    <div class="comment">
      <div
        class="user-comment"
        v-for="(comment, index) in commentItem"
        :key="index"
      >
        <div class="comment-header">
          <div class="user-info">
            <i class="fa fa-user-circle" aria-hidden="true"></i>
            <a class="user-name" href="#">{{ comment.name }}</a>
            <span class="comment-time">• {{ comment.create_at }}</span>
          </div>

          <div class="comment-actions">
            <div class="menu-wrapper" v-if="menuVisible[comment._id]">
              <div class="menu-list">
                <div class="menu-item" @click="handleUpdate(comment)">
                  <i class="fa fa-edit"></i>
                  <span>Update</span>
                </div>

                <div class="menu-item" @click="handleDelete($event, comment)">
                  <i class="fa fa-trash"></i>
                  <span>Delete</span>
                </div>
              </div>
            </div>
            <button class="action-btn" @click.stop="toggleMenu(comment._id)">
              <i class="fa fa-ellipsis-h"></i>
            </button>
          </div>
        </div>
        <div class="comment-content">
          <p>{{ comment.comments }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- <ConfirmPopup></ConfirmPopup> -->
  <Dialog
    v-model:visible="display"
    modal
    header="Chỉnh sửa bình luận"
    class="comment-dialog"
  >
    <div class="edit-comment-form">
      <textarea
        v-model="data.comments"
        class="edit-input"
        placeholder="Nhập nội dung bình luận..."
        rows="3"
      ></textarea>
      <div class="button-group">
        <button class="btn-cancel" @click="closeDialog">Hủy</button>
        <button class="btn-save" @click="updateComment">Lưu</button>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
// import Toast from "primevue/toast";
const comments = ref("");
const route = useRoute();
const jobDetails = ref({});
const error = ref(null);
const menuVisible = ref({});
const commentItem = ref({});
const commentItems = ref([]);
const display = ref(false);
const data = ref({});
const token = ref(localStorage.getItem("token"));
const confirmPopup = useConfirm();

const toggleMenu = (commentId) => {
  const isCurrentlyVisible = menuVisible.value[commentId];
  Object.keys(menuVisible.value).forEach((key) => {
    menuVisible.value[key] = false;
  });
  menuVisible.value[commentId] = !isCurrentlyVisible;
};

const closeAllMenus = () => {
  Object.keys(menuVisible.value).forEach((key) => {
    menuVisible.value[key] = false;
  });
};

const fetchJobDetails = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/jobs/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch job details");
    }
    const data = await res.json();
    jobDetails.value = data.data;
  } catch (err) {
    console.error("Error fetching job details:", err);
    error.value = err.message;
  }
};



const handleUpdate = (comment) => {
  data.value = { ...comment };
  display.value = true;
  console.log("aaaaa", data.value);
};

const handleDelete = (event, comment) => {
  if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
    deleteComment(comment._id);
  }
};

const closeDialog = () => {
  display.value = false;
  data.value = {};
};

onMounted(() => {
  fetchJobDetails(route.params.id);

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.closest(".comment-actions")) {
      closeAllMenus();
    }
  });

  const fetchComments = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/comment/getAll");
      const data = await res.json();
      commentItem.value = data.data;
    } catch (error) {
      console.log(error);
    }
  };

  fetchComments();
});

const createComment = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/comment/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comments: comments.value }),
    });
    const data = await response.json();
    if (response.ok) {
      // Thêm comment mới vào mảng commentItem.value
      commentItem.value = [...commentItem.value, data.data];

      // Xóa nội dung trong ô input
      comments.value = "";
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Created successfully",
        life: 3000,
      });
    } else {
      console.error(data);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: data.message || "Failed to create",
        life: 3000,
      });
    }
  } catch (error) {
    console.error(error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to connect to server",
      life: 3000,
    });
  }
};

const deleteComment = async (commentId) => {
  try { 
    const response = await fetch(
      `http://localhost:3000/api/comment/delete/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      commentItem.value = commentItem.value.filter(
        (comment) => comment._id !== commentId
      );
    } else {
      console.error("Failed to delete comment");
    }
  } catch (error) {
    console.error(error);
  }
};

const updateComment = async () => {
  console.log("Data sent to API:", data.value._id);
  try {
    const response = await fetch(
      `http://localhost:3000/api/comment/update/${data.value._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments: data.value.comments }),
      }
    );
    const result = await response.json();
    if (response.ok) {
      // Cập nhật trực tiếp comment trong mảng hiện tại
      commentItem.value = commentItem.value.map((comment) => {
        if (comment._id === data.value._id) {
          return {
            ...comment,
            comments: data.value.comments, // Sử dụng giá trị mới từ form
          };
        }
        return comment;
      });

      // Đóng dialog
      closeDialog();
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Menu updated successfully",
        life: 3000,
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Lỗi",
        detail: result.message || "Cập nhật thất bại",
        life: 3000,
      });
    }
  } catch (error) {
    console.error(error);
    toast.add({
      severity: "error",
      summary: "Lỗi",
      detail: "Không thể kết nối đến máy chủ",
      life: 3000,
    });
  }
};
</script>

<style scoped>
:deep(.p-confirm-popup) {
  position: fixed;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}
.main-wrapper {
  background: #fff;
  padding: 20px;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.widget-title {
  border-left: 4px solid #00b14f;
  padding-left: 10px;
  margin-bottom: 20px;
}

.widget-title span {
  font-size: 18px;
  font-weight: bold;
  color: #212f3f;
}

.welfare-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.welfare-list ul li {
  margin-bottom: 15px;
}

/* .welfare-list ul li p {
  display: flex;
  align-items: center;
} */
.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.benefit-item i {
  color: #4d6eb7;
  background-color: #edf5ff;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.benefit-item span {
  flex: 1;
  color: #333;
  font-size: 14px;
  line-height: 1.5;
}
.icn-welfare {
  background-color: #edf5ff;
  color: #4d6eb7;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.jd-content {
  color: #4d4d4d;
  line-height: 1.6;
  font-size: 14px;
}

.comment {
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.1) 0px 2px 4px;
  transition: all 0.3s ease;
}

.name-user {
  margin-left: 20px;
}

.cm-user {
  margin: 10px 0 10px 20px;
  padding: 10px;
  border-radius: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap-reverse;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.fa-user-circle {
  font-size: 24px;
  color: #666;
}

.user-name {
  font-weight: 600;
  color: #333;
  text-decoration: none;
}

.comment-time {
  color: #666;
  font-size: 0.9em;
}

.comment-content {
  color: #333;
  line-height: 1.5;
  margin-left: 32px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
}

.action-btn {
  border: none;
  background: none;
  cursor: pointer;
  color: #666;
  padding: 4px 8px;
}

.action-btn:hover {
  background: #f0f0f0;
  border-radius: 4px;
}

.comment-actions {
  position: relative;
}

.menu-wrapper {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  z-index: 1000;
  margin-top: 5px;
  animation: fadeIn 0.2s ease-in-out;
}

.menu-list {
  padding: 8px 0;
}

.menu-item {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item i {
  width: 16px;
  color: #666;
}

.menu-item span {
  color: #333;
  font-size: 14px;
}

.action-btn {
  border: none;
  background: transparent;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background-color: #f0f0f0;
}

.action-btn i {
  font-size: 16px;
  color: #666;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Style cho dialog */
.edit-comment-form {
  padding: 20px;
}

.edit-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  margin-bottom: 15px;
  font-size: 14px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancel,
.btn-save {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-size: 14px;
}

.btn-cancel {
  background: #f0f0f0;
  color: #333;
}

.btn-save {
  background: #00b14f;
  color: white;
}

.btn-cancel:hover {
  background: #e4e4e4;
}

.btn-save:hover {
  background: #009a44;
}

:deep(.p-dialog) {
  max-width: 500px;
  width: 90%;
}

:deep(.p-dialog-header) {
  padding: 1rem;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

:deep(.p-dialog-content) {
  padding: 0;
}
</style>

<template>
    <Toolbar class="mb-4">
        <template v-slot:start>
            <div class="my-2">
                <Button label="New" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
            </div>
        </template>
    </Toolbar>

    <DataTable
        ref="dt"
        :value="applyItems"
        v-model:selection="selectedApplyItems"
        dataKey="_id"
        :paginator="true"
        :rows="10"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
    >
        <template #header>
            <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                <h5 class="m-0">Apply</h5>
                <IconField iconPosition="left" class="block mt-2 md:mt-0">
                    <InputIcon class="pi pi-search" />
                </IconField>
            </div>
        </template>

        <Column field="_id" header="Code" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Code</span>
                {{ slotProps.data._id }}
            </template>
        </Column>
        <Column field="title" header="User" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">User</span>
                {{ slotProps.data.userid }}
            </template>
        </Column>
        <Column field="company" header="Fullname" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Fullname</span>
                {{ slotProps.data.fullname }}
            </template>
        </Column>
        <Column field="location" header="Phone" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Phone</span>
                {{ slotProps.data.phone }}
            </template>
        </Column>
        <Column field="salary" header="Gender" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Gender</span>
                {{ slotProps.data.gender }}
            </template>
        </Column>
        <Column field="logo" header=">Date of Birth" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Date of Birth</span>
                {{ slotProps.data.date_of_birth }}
            </template>
        </Column>
        <Column field="benefits" header="Marriage" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Marriage</span>
                <span class="truncate-text" v-tooltip.top="slotProps.data.marriage">
                    {{ slotProps.data.marriage }}
                </span>
            </template>
        </Column>
        <Column field="jobDescription" header="Province" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Province</span>
                <span class="truncate-text" v-tooltip.top="slotProps.data.province">
                    {{ slotProps.data.province }}
                </span>
            </template>
        </Column>
        <Column field="jobRequest" header="Residence" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Residence</span>
                <span class="truncate-text" v-tooltip.top="slotProps.data.residence">
                    {{ slotProps.data.residence }}
                </span>
            </template>
        </Column>

        <Column field="file" header="File" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">File</span>
                <div v-if="slotProps.data.file">
                    <div class="file-name">{{ getFileName(slotProps.data.file) }}</div>

                    <Button class="p-button-text p-button-sm mr-2" @click="viewFile(getFileName(slotProps.data.file))" tooltip="Xem file">
                        <i class="pi pi-eye mr-1"></i>
                        Xem
                    </Button>

                    <Button class="p-button-text p-button-sm" @click="downloadFile(getFileName(slotProps.data.file), `CV_${slotProps.data._id}.${getFileExtension(getFileName(slotProps.data.file))}`)" tooltip="Tải xuống">
                        <i class="pi pi-download mr-1"></i>
                        Tải về
                    </Button>
                </div>
                <div v-else>
                    <span class="text-gray-500">Chưa có file đính kèm</span>
                </div>
            </template>
        </Column>

        <Column field="jobRequest" header="Title" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Title</span>
                <span class="truncate-text" v-tooltip.top="slotProps.data.title">
                    {{ slotProps.data.title }}
                </span>
            </template>
        </Column>
        <Column field="jobRequest" header="Qualification" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Qualification</span>
                <span class="truncate-text" v-tooltip.top="slotProps.data.qualification">
                    {{ slotProps.data.qualification }}
                </span>
            </template>
        </Column>
        <Column field="jobRequest" header="Experience" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Experience</span>
                <span class="truncate-text" v-tooltip.top="slotProps.data.experience">
                    {{ slotProps.data.experience }}
                </span>
            </template>
        </Column>
        <Column field="jobRequest" header="Current Position" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Current Position</span>
                <span class="truncate-text" v-tooltip.top="slotProps.data.current_position">
                    {{ slotProps.data.current_position }}
                </span>
            </template>
        </Column>
        <Column field="jobRequest" header="Desired Position" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Desired Position</span>
                <span class="truncate-text" v-tooltip.top="slotProps.data.desired_position">
                    {{ slotProps.data.desired_position }}
                </span>
            </template>
        </Column>
        <Column field="jobRequest" header="Desired Job" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Desired Job</span>
                <span class="truncate-text" v-tooltip.top="slotProps.data.desired_job">
                    {{ slotProps.data.desired_job }}
                </span>
            </template>
        </Column>
        <Column field="jobRequest" header="Salary" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Salary</span>
                <span class="truncate-text" v-tooltip.top="slotProps.data.salary">
                    {{ slotProps.data.salary }}
                </span>
            </template>
        </Column>
        <Column field="jobRequest" header="Workplace" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Workplace</span>
                <span class="truncate-text" v-tooltip.top="slotProps.data.workplace">
                    {{ slotProps.data.workplace }}
                </span>
            </template>
        </Column>

        <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="open(slotProps.data)" />
                <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded @click="confirm($event, slotProps.data)" />
            </template>
        </Column>
    </DataTable>

    <Dialog v-model:visible="applyDialog" :style="{ width: '450px' }" header="Apply Details" :modal="true" class="p-fluid">
        <div class="field" field="_id">
            <label for="fullname">Fullname</label>
            <InputText id="fullname" v-model.trim="apply.fullname" required="true" autofocus :invalid="submitted && !!apply.fullname" />
            <small class="p-invalid" v-if="submitted && !apply.fullname">Fullname is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="phone">Phone</label>
            <InputText id="phone" v-model.trim="apply.phone" required="true" autofocus :invalid="submitted && !!apply.phone" />
            <small class="p-invalid" v-if="submitted && !apply.company">Company is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="gender">Gender</label>
            <InputText id="gender" v-model.trim="apply.gender" required="true" autofocus :invalid="submitted && !!apply.gender" />
            <small class="p-invalid" v-if="submitted && !apply.gender">Location is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="date_of_birth">Date of Birth</label>
            <InputText id="date_of_birth" v-model.trim="apply.date_of_birth" required="true" autofocus :invalid="submitted && !!apply.date_of_birth" />
            <small class="p-invalid" v-if="submitted && !apply.date_of_birth">Salary is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="marriage">Marriage</label>
            <InputText id="marriage" v-model.trim="apply.marriage" required="true" autofocus :invalid="submitted && !!apply.marriage" />
            <small class="p-invalid" v-if="submitted && !apply.marriage">Salary is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="province">Province</label>
            <InputText id="province" v-model.trim="apply.province" required="true" autofocus :invalid="submitted && !!apply.province" />
            <small class="p-invalid" v-if="submitted && !apply.province">Benefits is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="residence">Residence</label>
            <Textarea id="residence" v-model.trim="apply.residence" required="true" autofocus :invalid="submitted && !!apply.residence" rows="4" />
            <small class="p-invalid" v-if="submitted && !apply.residence">Job Description is required.</small>
        </div>

        <div class="field">
            <label for="file">File Upload</label>
            <div id="drop-area" :class="{ 'is-invalid': submitted && !selectedFile }">
                <input type="file" id="fileElem" accept=".pdf,.doc,.docx" @change="handleFiles($event.target.files)" />
                <label style="cursor: pointer" for="fileElem"> Upload CV file or drag & drop here </label>
                <progress id="progress-bar" max="100" :value="uploadProgress" v-show="uploadProgress > 0 && uploadProgress < 100"></progress>
                <div v-if="selectedFile" class="selected-file">Selected file: {{ selectedFile.name }}</div>
            </div>
            <small class="p-invalid" v-if="submitted && !selectedFile"> File is required. </small>
        </div>

        <div class="field" field="_id">
            <label for="title">Title</label>
            <Textarea id="title" v-model.trim="apply.title" required="true" autofocus :invalid="submitted && !!apply.title" rows="4" />
            <small class="p-invalid" v-if="submitted && !apply.title">Job Request is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="qualification">Qualification</label>
            <Textarea id="qualification" v-model.trim="apply.qualification" required="true" autofocus :invalid="submitted && !!apply.qualification" rows="4" />
            <small class="p-invalid" v-if="submitted && !apply.qualification">Qualification Request is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="experience">Experience</label>
            <Textarea id="experience" v-model.trim="apply.experience" required="true" autofocus :invalid="submitted && !!apply.experience" rows="4" />
            <small class="p-invalid" v-if="submitted && !apply.experience">Qualification Request is required.</small>
        </div>

        <div class="field" field="_id">
            <label for="current_position">Current Position</label>
            <Textarea id="current_position" v-model.trim="apply.current_position" required="true" autofocus :invalid="submitted && !!apply.current_position" rows="4" />
            <small class="p-invalid" v-if="submitted && !apply.current_position">Qualification Request is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="desired_position">Desired Position</label>
            <Textarea id="desired_position" v-model.trim="apply.desired_position" required="true" autofocus :invalid="submitted && !!apply.desired_position" rows="4" />
            <small class="p-invalid" v-if="submitted && !apply.desired_position">Qualification Request is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="desired_job">Desired Job</label>
            <Textarea id="desired_job" v-model.trim="apply.desired_job" required="true" autofocus :invalid="submitted && !!apply.desired_job" rows="4" />
            <small class="p-invalid" v-if="submitted && !apply.desired_job">Qualification Request is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="salary">Salary</label>
            <Textarea id="salary" v-model.trim="apply.salary" required="true" autofocus :invalid="submitted && !!apply.salary" rows="4" />
            <small class="p-invalid" v-if="submitted && !apply.salary">Salary Request is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="workplace">Workplace</label>
            <Textarea id="workplace" v-model.trim="apply.workplace" required="true" autofocus :invalid="submitted && !!apply.workplace" rows="4" />
            <small class="p-invalid" v-if="submitted && !apply.workplace">Workplace Request is required.</small>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" text="" @click="applyDialog = false" />
            <Button label="Save" icon="pi pi-check" text="" @click="createApply" />
        </template>
    </Dialog>

    <Dialog v-model:visible="display" :style="{ width: '450px' }" header="Apply Details" :modal="true" class="p-fluid">
        <div class="field">
            <label for="fullname">Fullname</label>
            <InputText id="fullname" v-model.trim="apply.fullname" required autofocus />
        </div>
        <div class="field">
            <label for="phone">Phone</label>
            <InputText id="phone" v-model.trim="apply.phone" required autofocus />
        </div>
        <div class="field">
            <label for="gender">Gender</label>
            <InputText id="gender" v-model.trim="apply.gender" required autofocus />
        </div>
        <div class="field">
            <label for="date_of_birth">Date of Birth</label>
            <InputText id="date_of_birth" v-model.trim="apply.date_of_birth" required autofocus />
        </div>
        <div class="field">
            <label for="marriage">Marriage</label>
            <InputText id="marriage" v-model.trim="apply.marriage" required autofocus />
        </div>
        <div class="field">
            <label for="province">Province</label>
            <InputText id="province" v-model.trim="apply.province" required autofocus />
        </div>
        <div class="field">
            <label for="residence">Residence</label>
            <InputText id="residence" v-model.trim="apply.residence" required autofocus />
        </div>
        <!-- <div class="field">
            <label for="file">File</label>
            <InputText id="file" v-model.trim="apply.file" required autofocus />
        </div> -->
        <div class="field">
            <label for="file">File Upload</label>
            <div id="drop-area" :class="{ 'is-invalid': submitted && !selectedFile && !apply.file }">
                <input type="file" id="fileElemUpdate" accept=".pdf,.doc,.docx" @change="handleFiles($event.target.files)" />
                <label style="cursor: pointer" for="fileElemUpdate"> Upload new CV file or drag & drop here </label>
                <progress id="progress-bar" max="100" :value="uploadProgress" v-show="uploadProgress > 0 && uploadProgress < 100"></progress>
                <div v-if="selectedFile" class="selected-file">New file selected: {{ selectedFile.name }}</div>
                <div v-else-if="apply.file" class="current-file">Current file: {{ getFileName(apply.file) }}</div>
            </div>
        </div>
        <div class="field">
            <label for="title">Title</label>
            <InputText id="title" v-model.trim="apply.title" required autofocus />
        </div>
        <div class="field">
            <label for="qualification">Qualification</label>
            <InputText id="qualification" v-model.trim="apply.qualification" required autofocus />
        </div>
        <div class="field">
            <label for="experience">Experience</label>
            <InputText id="experience" v-model.trim="apply.experience" required autofocus />
        </div>

        <div class="field">
            <label for="current_position">Current Position</label>
            <InputText id="current_position" v-model.trim="apply.current_position" required autofocus />
        </div>
        <div class="field">
            <label for="desired_position">Desired Position</label>
            <InputText id="desired_position" v-model.trim="apply.desired_position" required autofocus />
        </div>
        <div class="field">
            <label for="desired_job">Desired Job</label>
            <InputText id="desired_job" v-model.trim="apply.desired_job" required autofocus />
        </div>
        <div class="field">
            <label for="salary">Salary</label>
            <InputText id="salary" v-model.trim="apply.salary" required autofocus />
        </div>
        <div class="field">
            <label for="workplace">Workplace</label>
            <InputText id="workplace" v-model.trim="apply.workplace" required autofocus />
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" text="" @click="display = false" />
            <Button label="Save" icon="pi pi-check" text="" @click="updateApply" />
        </template>
    </Dialog>
    <ConfirmPopup></ConfirmPopup>
</template>

<script setup>
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
const apply = ref({});
const applytoDelete = ref(null);
const applyDialog = ref(false);
const applyItems = ref([]);
const selectedApplyItems = ref(null);
const submitted = ref(false);
const display = ref(false);
const toast = useToast();
const confirmPopup = useConfirm();
const uploadProgress = ref(0);
const selectedFile = ref(null);
const open = (editApply) => {
    apply.value = { ...editApply };
    display.value = true;
};

const confirm = (event, apply) => {
    applytoDelete.value = apply;
    confirmPopup.require({
        target: event.target,
        message: 'bạn có muốn xóa không',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            deleteApply(applytoDelete.value._id);
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};
const openNew = () => {
    apply.value = {};
    submitted.value = false;
    applyDialog.value = true;
};

onMounted(async () => {
    try {
        const res = await fetch('https://job-api.mrun.site/api/apply/getAll');
        const data = await res.json();
        applyItems.value = data.data;
        console.log('a', applyItems.value);
    } catch (error) {
        console.log(err);
    }
});

const createApply = async () => {
    try {
        const response = await fetch('https://job-api.mrun.site/api/apply/createAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(apply.value)
        });
        const data = await response.json();
        if (response.ok) {
            applyItems.value.push(data.data);
            applyDialog.value = false;
        } else {
            console.error(data);
        }
    } catch (error) {
        console.error(data);
    }
};

const updateApply = async () => {
    try {
        const response = await fetch(`https://job-api.mrun.site/api/apply/update/${apply.value._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(apply.value)
        });
        const data = await response.json();
        console.log('Response from API:', data);
        if (response.ok) {
            const index = applyItems.value.findIndex((item) => item._id === apply.value._id);
            if (index !== -1) {
                applyItems.value[index] = { ...apply.value };
            }
            display.value = false;
            toast.add({ severity: 'success', summary: 'Success', detail: 'Menu updated successfully', life: 3000 });
        } else {
            console.error(data);
            toast.add({ severity: 'error', summary: 'Error', detail: data.message || 'Failed to update menu', life: 3000 });
        }
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to connect to server', life: 3000 });
    }
};

const handleFiles = (files) => {
    if (files && files[0]) {
        selectedFile.value = files[0];
        uploadProgress.value = 0;
        apply.value.file = selectedFile.value.name;
        const interval = setInterval(() => {
            if (uploadProgress.value < 100) {
                uploadProgress.value += 10;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }
};

const deleteApply = async (applyId) => {
    try {
        const response = await fetch(`https://job-api.mrun.site/api/apply/delete/${applyId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.ok) {
            applyItems.value = applyItems.value.filter((item) => item._id !== applyId);
            toast.add({ severity: 'success', summary: 'Success', detail: 'Apply deleted successfully', life: 3000 });
        } else {
            console.error(data);
            toast.add({ severity: 'error', summary: 'Error', detail: data.message || 'Failed to delete apply', life: 3000 });
        }
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to connect to server', life: 3000 });
    }
};

// Thêm vào phần script
const getFileName = (fileString) => {
    if (!fileString) return '';
    // Nếu fileString là một mảng, lấy phần tử đầu tiên
    if (Array.isArray(fileString)) {
        return fileString[0] || '';
    }
    // Nếu là string, trả về nguyên bản
    return fileString;
};
</script>

<style lang="scss" scoped>
.file-name {
    margin-bottom: 0.5rem;
    color: #495057;
    word-break: break-all;
}
#drop-area {
    border: 2px dashed #ccc;
    border-radius: 4px;
    padding: 20px;
    text-align: center;
    margin-top: 5px;

    &.is-invalid {
        border-color: #dc3545;
    }

    input[type='file'] {
        display: none;
    }

    label {
        display: block;
        padding: 10px;
        background-color: #f8f9fa;
        border-radius: 4px;
        margin-bottom: 10px;

        &:hover {
            background-color: #e9ecef;
        }
    }
}

#progress-bar {
    width: 100%;
    height: 10px;
    margin: 10px 0;
}

.selected-file,
.current-file {
    margin-top: 10px;
    padding: 8px;
    background-color: #e9ecef;
    border-radius: 4px;
    word-break: break-all;
}

.current-file {
    background-color: #d4edda;
}
</style>

<script setup>
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, reactive } from 'vue';

const product = ref({
    title: '',
    company: '',
    location: '',
    salary: '',
    logo: null,
    benefits: '',
    jobDescription: '',
    jobRequest: '',
    programmingLanguages: '',
    isUrgent: false,
});
const menuItems = ref([]);
const selectedMenuItems = ref(null);
const submitted = ref(false);
const menuDialog = ref(false);
const display = ref(false);
const productToDelete = ref(null);

const confirmPopup = useConfirm();
const toast = useToast();

const openNew = () => {
    product.value = {
        title: '',
        company: '',
        location: '',
        salary: '',
        logo: null,
        benefits: '',
        jobDescription: '',
        jobRequest: '',
        programmingLanguages: '',
        isUrgent: false,
    };
    submitted.value = false;
    menuDialog.value = true;
};
const open = (editProduct) => {
    //display.value = { ...editProduct };
    product.value = { ...editProduct };
    display.value = true;
};
const confirm = (event, product) => {
    productToDelete.value = product;
    confirmPopup.require({
        target: event.target,
        message: 'bạn có muốn xóa không',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            deleteJobs(productToDelete.value._id);
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};
onMounted(async () => {
    try {
        const res = await fetch('http://localhost:3000/api/jobs/getAll');
        const data = await res.json();
        menuItems.value = data.data;
    } catch (err) {
        console.log(err);
    }
});
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        product.value.logo = file.name; 
    }
};
const selectFile = () => {
    const fileInput = document.querySelector('input[type="file"]');
    fileInput.click();
};

const createMenu = async () => {
    const requiredFields = [
        { key: 'title', message: 'Title trường bị trống.' },
        { key: 'company', message: 'Company trường bị trống.' },
        { key: 'location', message: 'Location trường bị trống.' },
        { key: 'salary', message: 'Salary trường bị trống.' },
        { key: 'logo', message: 'Logo trường bị trống.' },
        { key: 'benefits', message: 'Benefits trường bị trống.' },
        { key: 'jobDescription', message: 'Job Description trường bị trống.' },
        { key: 'jobRequest', message: 'Job Request is required.' },
        { key: 'programmingLanguages', message: 'Programming Languages trường bị trống.' },
    ];

    const missingFields = requiredFields.filter(field => !product.value[field.key]);

if (missingFields.length === requiredFields.length) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Không có trường nào được nhập.', life: 3000 });
    return;
} else if (missingFields.length > 0) {
    const messages = missingFields.map(field => field.message).join(' ');
    toast.add({ severity: 'error', summary: 'Error', detail: `Bạn chưa thêm trường: ${messages}`, life: 3000 });
    return;
}
    const formData = new FormData();
    formData.append('title', product.value.title);
    formData.append('company', product.value.company);
    formData.append('location', product.value.location);
    formData.append('salary', product.value.salary);
    formData.append('logo', product.value.logo); 

    formData.append('benefits', product.value.benefits);

    formData.append('jobDescription', product.value.jobDescription);
    formData.append('jobRequest', product.value.jobRequest);
    formData.append('programmingLanguages', product.value.programmingLanguages);
    formData.append('isUrgent', product.value.isUrgent ? 'true' : 'false');


    try {
        const response = await fetch('http://localhost:3000/api/jobs/admin/create', {
            method: 'POST',
            body: formData, 
        });
        const data = await response.json();
        if (response.ok) {
            menuItems.value.push(data.data);
            menuDialog.value = false;
            toast.add({ severity: 'success', summary: 'Success', detail: 'Job created successfully', life: 3000 });
        } else {
            console.error(data);
            toast.add({ severity: 'error', summary: 'Error', detail: data.message || 'Failed to create job', life: 3000 });
        }
    } catch (error) {
        console.error(error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to connect to server', life: 3000 });
    }
};

const updateJobs = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/jobs/update/${product.value._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product.value)
        });
        const data = await response.json();
        if (response.ok) {
            const index = menuItems.value.findIndex((item) => item._id === product.value._id);
            if (index !== -1) {
                menuItems.value[index] = data; 
            }
            display.value = false; 
            location.reload();
            toast.add({ severity: 'success', summary: 'Success', detail: 'Menu updated successfully', life: 3000 });
        } else {
            console.error(data);
            toast.add({ severity: 'error', summary: 'Error', detail: data.message || 'Failed to update menu', life: 3000 });
        }
    } catch (error) {
        console.error(error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to connect to server', life: 3000 });
    }
};

const deleteJobs = async (productId) => {
    if (!productId) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Product ID is required for deletion.', life: 3000 });
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/jobs/delete/${productId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (response.ok) {
            menuItems.value = menuItems.value.filter(item => item._id !== productId);
            toast.add({ severity: 'success', summary: 'Success', detail: 'Job deleted successfully', life: 3000 });
        } else {
            console.error(data);
            toast.add({ severity: 'error', summary: 'Error', detail: data.message || 'Failed to delete job', life: 3000 });
        }
    } catch (error) {
        console.error(error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to connect to server', life: 3000 });
    }
};
</script>

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
        :value="menuItems"
        v-model:selection="selectedMenuItems"
        dataKey="_id"
        :paginator="true"
        :rows="10"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
    >
        <template #header>
            <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                <h5 class="m-0">Jobs</h5>
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
        <Column field="title" header="Title" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Title</span>
                {{ slotProps.data.title }}
            </template>
        </Column>
        <Column field="company" header="Company" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Company</span>
                {{ slotProps.data.company }}
            </template>
        </Column>
        <Column field="location" header="Location" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Location</span>
                {{ slotProps.data.location }}
            </template>
        </Column>
        <Column field="salary" header="Salary" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Salary</span>
                {{ slotProps.data.salary }}
            </template>
        </Column>
        <Column field="logo" header="Logo" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Logo</span>
                <img :src="slotProps.data.logo" alt="Logo" class="preview-image" />
            </template>
        </Column>
        <!-- <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="open(slotProps.data)" />
                <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded @click="confirm($event, slotProps.data)" />
            </template>
        </Column> -->
        <Column field="benefits" header="Benefits" :sortable="true" headerStyle="width:14%; min-width:10rem;">
    <template #body="slotProps">
        <span class="p-column-title">Benefits</span>
        <span class="truncate-text" v-tooltip.top="slotProps.data.benefits">
            {{ Array.isArray(slotProps.data.benefits) ? slotProps.data.benefits.join(', ') : slotProps.data.benefits }}
        </span>
    </template>
</Column>
        <Column field="jobDescription" header="Job Description" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Job Description</span>
                <span class="truncate-text" v-tooltip.top="slotProps.data.jobDescription">
                    {{ slotProps.data.jobDescription }}
                </span>
            </template>
        </Column>
        <Column field="jobRequest" header="Job Request" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Job Request</span>
                <span class="truncate-text" v-tooltip.top="slotProps.data.jobRequest">
                    {{ slotProps.data.jobRequest }}
                </span>
            </template>
        </Column>
        <Column field="programmingLanguages" header="programmingLanguages" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Language</span>
                <span class="truncate-text" v-tooltip.top="slotProps.data.programmingLanguages">
            {{ Array.isArray(slotProps.data.programmingLanguages) ? slotProps.data.programmingLanguages.join(', ') : slotProps.data.programmingLanguages }}
        </span>
            </template>
        </Column>
        <Column field="isUrgent" header="Urgent" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Urgent</span>
                <span>{{ slotProps.data.isUrgent ? 'Yes' : 'No' }}</span>
            </template>
        </Column>
        <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="open(slotProps.data)" />
                <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded @click="confirm($event, slotProps.data)" />
            </template>
        </Column>
    </DataTable>

    <Dialog v-model:visible="menuDialog" :style="{ width: '450px' }" header="User Details" :modal="true" class="p-fluid">
        <div class="field" field="_id">
            <label for="title">Title</label>
            <InputText id="title" v-model.trim="product.title" required="true" autofocus :invalid="submitted && !!product.title" />
            <small class="p-invalid" v-if="submitted && !product.title">Title is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="company">Company</label>
            <InputText id="company" v-model.trim="product.company" required="true" autofocus :invalid="submitted && !!product.company" />
            <small class="p-invalid" v-if="submitted && !product.company">Company is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="location">Location</label>
            <InputText id="location" v-model.trim="product.location" required="true" autofocus :invalid="submitted && !!product.location" />
            <small class="p-invalid" v-if="submitted && !product.location">Location is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="salary">Salary</label>
            <InputText id="salary" v-model.trim="product.salary" required="true" autofocus :invalid="submitted && !!product.salary" />
            <small class="p-invalid" v-if="submitted && !product.salary">Salary is required.</small>
        </div>
        <div class="field" field="_id">
        <label for="logo">Logo</label>
        <div class="file-upload">
            <input type="file" id="logo" ref="fileInput" @change="handleFileChange" accept="image/*" style="display: none;" />
            <Button label="Choose File" icon="pi pi-upload" @click="selectFile" />
            <span v-if="product.logo" class="file-name">{{ product.logo }}</span>
        </div>
        <small class="p-invalid" v-if="submitted && !product.logo">Logo is required.</small>
    </div>
        <div class="field" field="_id">
            <label for="benefits">Benefits</label>
            <InputText id="benefits" v-model.trim="product.benefits" required="true" autofocus :invalid="submitted && !!product.benefits" />
            <small class="p-invalid" v-if="submitted && !product.benefits">Benefits is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="jobDescription">Job Description</label>
            <Textarea id="jobDescription" v-model.trim="product.jobDescription" required="true" autofocus :invalid="submitted && !!product.jobDescription" rows="4" />
            <small class="p-invalid" v-if="submitted && !product.jobDescription">Job Description is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="jobRequest">Job Request</label>
            <Textarea id="jobRequest" v-model.trim="product.jobRequest" required="true" autofocus :invalid="submitted && !!product.jobRequest" rows="4" />
            <small class="p-invalid" v-if="submitted && !product.jobRequest">Job Request is required.</small>
        </div>
        <div class="field" field="_id">
            <label for="programmingLanguages">Language</label>
            <Textarea id="programmingLanguages" v-model.trim="product.programmingLanguages" required="true" autofocus :invalid="submitted && !!product.programmingLanguages" rows="4" />
            <small class="p-invalid" v-if="submitted && !product.programmingLanguages">Job Request is required.</small>
        </div>
        <div class="field">
            <label for="isUrgent">Is Urgent</label>
            <InputSwitch v-model="product.isUrgent" />
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" text="" @click="menuDialog = false" />
            <Button label="Save" icon="pi pi-check" text="" @click="createMenu" />
        </template>
    </Dialog>

    <Dialog v-model:visible="display" :style="{ width: '450px' }" header="User Details" :modal="true" class="p-fluid">
        <div class="field">
            <label for="title">Title</label>
            <InputText id="title" v-model.trim="product.title" required autofocus />
        </div>
        <div class="field">
            <label for="company">Company</label>
            <InputText id="company" v-model.trim="product.company" required autofocus />
        </div>
        <div class="field">
            <label for="location">Location</label>
            <InputText id="location" v-model.trim="product.location" required autofocus />
        </div>
        <div class="field">
            <label for="salary">Salary</label>
            <InputText id="salary" v-model.trim="product.salary" required autofocus />
        </div>
        <div class="field">
            <label for="logo">Logo</label>
            <InputText id="logo" v-model.trim="product.logo" readonly /> 
        </div>
        <div class="field">
            <label for="benefits">Benefits</label>
            <InputText id="benefits" v-model.trim="product.benefits" required autofocus />
        </div>
        <div class="field">
            <label for="jobDescription">Job Description</label>
            <Textarea id="jobDescription" v-model.trim="product.jobDescription" required autofocus rows="4" />
        </div>
        <div class="field">
            <label for="jobRequest">Job Request</label>
            <Textarea id="jobRequest" v-model.trim="product.jobRequest" required autofocus rows="4" />
        </div>
        <div class="field">
            <label for="programmingLanguages">Language</label>
            <Textarea id="programmingLanguages" v-model.trim="product.programmingLanguages" required autofocus rows="4" />
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="display = false" />
            <Button label="Save" icon="pi pi-check" @click="updateJobs" />
        </template>
    </Dialog>
    <ConfirmPopup></ConfirmPopup>
</template>

<style scoped>
.truncate-text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
.preview-image {
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
    border: 1px solid #ddd;
    border-radius: 5px;
}
</style>

<template>
  <div>
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="flex-grow-1 content p-4" ">
      <div class=" container-fluid bg-main p-5 shadow-sm">
        <div class="row g-5">
          <div class="col-lg-4">
            <div class="card border-0 bg-secondary py-3">
              <div class="position-relative mx-auto" style="width: 150px; height: 150px;">
                <img :src="profileStore.user?.avatar" class="rounded-circle border w-100 h-100" alt="" />
                <div class="dropdown position-absolute bg-main rounded-circle" style="bottom: 35px; right: -9px;">
                  <span class="d-flex justify-content-center align-items-center bg-btn text-white rounded-circle"
                    data-bs-toggle="dropdown" style="width: 30px; height: 30px; cursor: pointer;">
                    <i class="bi bi-pencil fs-6"></i>
                  </span>

                  <ul class="dropdown-menu px-2 bg-main border">
                    <li>
                      <input type="file" style="display: none;" id="uploadImage" accept="image/*" @change="handlefile">
                      <label for="uploadImage" class="btn dropdown-item mb-1 nav-text">
                        <i class="bi bi-camera-fill me-2"></i> Change Profile
                      </label>
                    </li>
                    <li>
                      <button class="btn dropdown-item nav-text" @click="handleOpenModal">
                        <i class="bi bi-trash text-danger me-2"></i> Remove
                        Profile
                      </button>
                    </li>
                  </ul>

                </div>
              </div>
              <div class="card-body py-2">
                <h6 class="text-main text-center mb-3" id="usernames"></h6>
                <div class="d-flex justify-content-center gap-3">
                  <button class="btn btn-danger px-4">Log out</button>
                  <button class="btn bg-btn text-white px-4 getInfoBack" @click="handlOpenEdit">Edit Info</button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-8">
            <div class="row d-flex">
              <div class="col-lg-6">
                <label class="form-label my-2 text-main">Profile ID : </label>
                <div class="position-relative text-secondary mb-2 text-main">
                  <input type="text" class="form-control bg-main fs-text ps-7 border text-main"
                    :value="profileStore.user?.id" disabled>
                  <i class="bi bi-person position-absolute icon-input tran-y"></i>
                </div>
              </div>
              <div class="col-lg-6">
                <label class="form-label my-2 text-main">Email : </label>
                <div class="position-relative text-secondary mb-2 text-main">
                  <input type="email" class="form-control bg-main fs-text ps-7 border text-main"
                    :value="profileStore.user?.email" disabled>
                  <i class="bi bi-envelope position-absolute icon-input tran-y"></i>
                </div>
              </div>
              <div class="col-lg-6">
                <label class="form-label my-2 text-main">First Name : </label>
                <div class="position-relative text-secondary mb-2 text-main">
                  <input type="text" id="firstname" class="form-control bg-main fs-text ps-7 border text-main"
                    :value="profileStore.user?.firstName" disabled>
                  <i class="bi bi-person position-absolute icon-input tran-y"></i>
                </div>
              </div>
              <div class="col-lg-6">
                <label class="form-label my-2 text-main">Last Name : </label>
                <div class="position-relative text-secondary mb-2 text-main">
                  <input type="text" id="lastname" class="form-control bg-main fs-text ps-7 border text-main"
                    :value="profileStore.user?.lastName" disabled>
                  <i class="bi bi-person position-absolute icon-input tran-y"></i>
                </div>
              </div>
              <div class="col-lg-6">
                <label class="form-label my-2 text-main">Register at : </label>
                <div class="position-relative text-secondary mb-2 text-main">
                  <input type="text" id="registered-at" class="form-control bg-main fs-text ps-7 border text-main"
                    :value="formatDate" disabled>
                  <i class="bi bi-calendar3 position-absolute icon-input tran-y"></i>
                </div>
              </div>
              <div class="col-lg-6">
                <label class="form-label my-2 text-main">Username : </label>
                <div class="position-relative text-secondary mb-2 text-main">
                  <input type="text" id="username" class="form-control bg-main fs-text ps-7 border text-main"
                    :value='`${profileStore.user?.firstName}  ${profileStore.user?.lastName}`' disabled>
                  <i class="bi bi-person position-absolute icon-input tran-y"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>

  <!-- baseModal -->
  <BaseModal :show-modal="openModal">
    <template #header>
      <div class="modal-body text-center">
        <h5 class="text-danger fw-medium mb-3">Remove Profile</h5>
        <p class="text-secondary">Are you sure you want to remove profile?</p>
        <button class="btn btn-outline-secondary px-5 py-2" @click="handleCloseModal">Cancel</button>
        <button class="btn btn-danger ms-2 px-5 py-2" @click="handleRemoveProfile">Remove</button>
      </div>
    </template>
  </BaseModal>
  <BaseModal :show-modal="openModalEdit">
    <template #header>
      <div class="modal-body">
        <h5 class="text-primary fw-medium mb-3 text-center">Edit Info</h5>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <label class="form-label my-2 text-main">First Name : </label>
              <div class="position-relative text-main mb-2">
                <input type="text" id="fname" class="form-control bg-main fs-text ps-7 border text-main"
                  placeholder="Enter your first name" v-model="form.firstName">
                <i class="bi bi-person position-absolute icon-input tran-y"></i>
              </div>
              <p class="mes text-danger"></p>
            </div>
            <div class="col-12">
              <label class="form-label my-2 text-main">Last Name : </label>
              <div class="position-relative text-main mb-2">
                <input type="text" id="lname" class="form-control bg-main fs-text ps-7 border text-main"
                  placeholder="Enter your last name" v-model="form.lastName">
                <i class="bi bi-person position-absolute icon-input tran-y"></i>
              </div>
              <p class="mes text-danger"></p>
            </div>
            <div class="col-12">
              <label class="form-label my-2 text-main">Email : </label>
              <div class="position-relative text-main mb-2">
                <input type="email" id="emailEdit" class="form-control bg-main fs-text ps-7 border text-main"
                  placeholder="Enter your email" v-model="form.email">
                <i class="bi bi-envelope position-absolute icon-input tran-y"></i>
              </div>
              <p class="mes text-danger"></p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <button class="btn btn-outline-secondary px-5 py-2" @click="handleCloseModal">Cancel</button>
      <button class="btn btn-info px-5 py-2 text-white" @click="handleEditProfile">Edit</button>
    </template>
  </BaseModal>
</template>

<script setup>
import api from '@/api/http';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import { UseProfile } from '@/stores/profile';
import { notify } from '@/utils/toast';
import { computed, onMounted, ref } from 'vue';

let profileStore = UseProfile()

onMounted(async () => {
  profileStore.fecthProfile()
})

const formatDate = computed(() => {
  const date = profileStore.user?.registeredAt
  if (!date) return ''

  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }).format(new Date(date))
})


let openModal = ref(false)
function handleOpenModal() {
  openModal.value = true
}
function handleCloseModal() {
  openModal.value = false
  openModalEdit.value = false
}
async function handleRemoveProfile() {
  try {
    let res = await api.delete('/profile/avatar')
    notify.sucess('remove Avatar successful !!')
    profileStore.fecthProfile()
    handleCloseModal()
  }
  catch (err) {
    notify.error("cann't remove avatar.")
    handleCloseModal()
  }
}


const handlefile = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  console.log(file);
  const fmdata = new FormData()
  fmdata.append('avatar', file)
  await api.post('/profile/avatar', fmdata)
  profileStore.fecthProfile()
  notify.sucess('Upload avatar successful !!')
}

let openModalEdit = ref(false)
let form = ref({
  firstName : '',
  lastName  : '',
  email     : '',
})
function handlOpenEdit(){
  openModalEdit.value =true
  form.value.firstName = profileStore.user?.firstName
  form.value.lastName = profileStore.user?.lastName
  form.value.email = profileStore.user?.email
}
async function handleEditProfile(){
  await api.put('/profile' , form.value)
  notify.sucess('Edit profile successful !!')
  profileStore.fecthProfile()
  handleCloseModal()
}
</script>

<style lang="scss" scoped></style>
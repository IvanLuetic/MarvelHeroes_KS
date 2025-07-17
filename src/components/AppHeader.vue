<template>
  <div class="relative mx-5 mt-4 mb-8">
    <div class="flex items-center justify-betwee">
      <div class="flex-1 text-center mb-5">
        <h3
          class="text-yellow-400 text-4xl sm:text-4xl font-black tracking-wide"
          style="
            font-family: 'Oswald', sans-serif;
            text-shadow:
              3px 3px 0px #000,
              -2px -2px 0px #000,
              2px -2px 0px #000,
              -2px 2px 0px #000,
              0px 0px 10px #dc2626;
          "
        >
          Add heroes to your collection
        </h3>
      </div>
      <!---Hamburger menu-->
      <div class="sm:hidden">
        <button
          @click="showMobileMenu = !showMobileMenu"
          class="flex items-center justify-center w-10 h-10 bg-black/60 backdrop-blur-sm border border-yellow-500/50 rounded-lg text-yellow-400 hover:text-yellow-300 hover:border-yellow-400/70 transition-all duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <!-- Mobile Dropdown Menu -->
        <div
          v-if="showMobileMenu"
          class="absolute right-5 mt-2 w-48 bg-black/90 backdrop-blur-md border border-yellow-500/50 rounded-lg shadow-xl z-50"
        >
          <div class="py-2">
            <a
              href="#"
              @click="goToProfile"
              class="flex items-center px-4 py-2 text-yellow-400 hover:text-yellow-300 hover:bg-red-600/20 transition-colors"
            >
              <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              View Profile
            </a>
            <a
              href="#"
              @click="logout"
              class="flex items-center px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-600/20 transition-colors"
            >
              <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </a>
          </div>
        </div>
      </div>

      <!-- Desktop Profile Dropdown -->
      <div class="hidden absolute right-0 top-0 sm:block">
        <div class="relative">
          <button
            @click="showDropdown = !showDropdown"
            class="flex items-center space-x-2 bg-black/60 backdrop-blur-sm border border-yellow-500/50 rounded-full px-4 py-2 text-yellow-400 hover:text-yellow-300 hover:border-yellow-400/70 transition-all duration-200"
          >
            <div
              class="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center"
            >
              <span class="text-white text-sm font-bold">{{ username }}</span>
            </div>
            <span class="font-medium">Profile</span>
            <svg
              class="w-4 h-4 transition-transform cursor-pointer"
              :class="{ 'rotate-180': showDropdown }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <!-- Desktop Dropdown Menu -->
          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-40 bg-black/90 backdrop-blur-md border border-yellow-500/50 rounded-lg shadow-xl z-50"
          >
            <div class="py-2">
              <a
                href="#"
                @click="goToProfile"
                class="flex items-center px-4 py-2 text-yellow-400 hover:text-yellow-300 hover:bg-red-600/20 transition-colors"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                View Profile
              </a>
              <a
                href="#"
                @click="logout"
                class="flex items-center px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-600/20 transition-colors"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const username = userStore.currentUser.firstName[0].toUpperCase()
const showDropdown = ref(false)
const showMobileMenu = ref(false)

const goToProfile = () => {
  alert('Sorry, the profile page has not been added yet')
  showDropdown.value = false
}

const logout = () => {
  localStorage.clear('token')

  router.push({
    name: 'auth',
  })
  showDropdown.value = false
}
</script>

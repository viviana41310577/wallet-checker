<template>
    <div class="container mx-auto">
        <header class="p-4 text-center border-b dark:border-neutral-500">
            <nav class="p-0">
                <router-link class="text-gray-500 hover:text-gray-600 px-2" to="/">Home</router-link>
                <router-link v-if="zk_count" class="text-gray-500 hover:text-gray-600 px-2" to="/zksync">ZkSync</router-link>
                <router-link v-if=starknet_count class="text-gray-500 hover:text-gray-600 px-2" to="/starknet">Starknet</router-link>
                <router-link v-if="zora_count" class="text-gray-500 hover:text-gray-600 px-2" to="/zora">Zora</router-link>
                <router-link v-if="aptos_count" class="text-gray-500 hover:text-gray-600 px-2" to="/aptos">Aptos</router-link>
                <router-link v-if="linea_count" class="text-gray-500 hover:text-gray-600 px-2" to="/linea">Linea</router-link>
                <router-link v-if="evm_count" class="text-gray-500 hover:text-gray-600 px-2" to="/balances">Balance</router-link>
                <router-link v-if="evm_count" class="text-gray-500 hover:text-gray-600 px-2" to="/evm">EVM</router-link>
            </nav>
        </header>
        <router-view/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            zk_count: this.$zk_count,
            starknet_count: this.$stark_count,
            zora_count: this.$zora_count,
            aptos_count: this.$aptos_count,
            linea_count: this.$linea_count,
            evm_count: this.$evm_count,
        }
    },
}
</script>

<style>

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

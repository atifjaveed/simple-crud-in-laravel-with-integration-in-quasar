<template>
 <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="id"
    >
    <template v-slot:body-cell-action="props">
        <q-td :props="props">
        <q-btn
          v-for="item in buttons"
          :key="item"
          :icon="item.icon"
          :color="item.color"
          @click="$emit(item.event,props.row.id)"
          class="q-mx-xs"
        />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'students',
  props:['rows','columns','buttons'],
  data () {
    return {}
  }
}
</script>

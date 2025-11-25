<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="Open Dialog"
        variant="flat"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Slet">
        <v-card-text> Vil du gerne slet den indkøbsliste. </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Ja" @click="isActive.value = true"></v-btn>
          <v-btn text="Nej" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: [],
  data() {
    return {};
  },
  methods: {},
};
</script>

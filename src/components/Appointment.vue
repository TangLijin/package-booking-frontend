<template>
  <div class="about">
    <!-- <a-menu style="width: 256px;" mode="vertical" @click="handleClick">
       <a-menu-item key="1" @click="handleClickManager">
        <a-icon type="mail" />管理员
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="calendar" />用户
      </a-menu-item> 
    </a-menu>-->
    预约取件
    <!-- <h1>This is an about page</h1> -->
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="运单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          '运单号',
          {rules: [{ required: true, message: '请输入运单号!' }]}
        ]"
        />
      </a-form-item>
      <a-form-item label="预约时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          '预约时间',
          {rules: [{ required: true, message: '请输入预约时间!' }]}
        ]"
        />
      </a-form-item>

      <a-button type="primary" html-type="submit" style="margin-right:80px">预约</a-button>
      <a-button type="default" html-type="button">取消</a-button>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this)
    };
  },
  mounted() {
    console.log("123      ", this.$store.getters.getAllPackage);
  },

  methods: {
    handleClickManager() {
      this.$router.push("/");
    },

    handleSubmit(e) {
      e.preventDefault();
      let values = this.form.values;
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }
        let packageNumberList = this.$store.state.packageList.map(
          i => i.运单号
        );
        //没有这个运单号
        if (packageNumberList.indexOf(values.运单号) < 0) {
          this.$message.info("这个运单号不存在");
        } else {
          //这里要存到store，然后通过put与后端数据库交互
          console.log("Received values of form: ", values);
          this.$store.commit("makeAppointment", values.运单号);
          console.log("-11111", this.$store.state.packageList[0]);
          console.log("---------", this.$store.state.packageList[0].运单号);
          console.log("--2222", this.$store.state.packageList[0].状态);

          packageList.filter(item => item.运单号 === values.运单号);
        }
      });
    }
  }
};
</script>

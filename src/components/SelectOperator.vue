<template>
  <Modal :transparent="true" :visible="modalVisible" :onRequestClose="close">
    <view
      class="modal-background"
      :style="{ height: windowHeight, width: windowWidth }"
    >
      <view
        class="modal-container"
        :style="{ height: windowHeight * 0.428, width: windowWidth }"
      >
          <view class="modal-content">
            <view class="modal-top">
              <text class="modtal-top-title">Select an operator</text>
              <touchable-opacity :on-press="() => close()">
                <image
                  :source="CloseIcon"
                  :style="{
                    width: windowWidth * 0.08,
                    height: windowHeight * 0.032,
                    resizeMode: 'contain',
                    marginLeft: 'auto',
                  }"
                ></image>
              </touchable-opacity>
            </view>
            <view class="divider" />
            <view class="scroll-container">
             <scroll-view-indicator
                :scrollIndicatorStyle='styles'
                :shouldIndicatorHide='false'
                :flexibleIndicator='false'
                :indicatorHeight='30'
                >
             <view 
                
                v-for="(operator, index) in operators"
                :key="index"
              >
                <touchable-opacity :on-press="() => selectOperator(operator.name )" class="modal-bottom-row">
                <image
                  :style="{
                    width: windowWidth * 0.083,
                    height: windowHeight * 0.047,
                    resizeMode: 'contain',
                    opacity:0.12
                  }"
                  :source="TokamakIcon"
                ></image>
                <text class="modal-bottom-row-text">{{ operator.name }}</text>
                </touchable-opacity>
              </view>
            </scroll-view-indicator>
            </view>
          </view>
      </view>

  </Modal>
</template>

<script>
import { Dimensions, Modal } from "react-native";
import TokamakIcon from "../../assets/TokamakLogo.png";
import CloseIcon from "../../assets/icon-close.png";
import DSRVIcon from "../../assets/dsrv.png";
import DXMIcon from "../../assets/dxm.png";
import { mapState } from 'vuex';
import ScrollViewIndicator from "react-native-scroll-indicator";

export default {
     components: {
    "scroll-view-indicator": ScrollViewIndicator,
  },
  data() {
    return {
      TokamakIcon,
      CloseIcon,
      DSRVIcon,
      DXMIcon,
      styles: {
        backgroundColor: "#5e94ea",
        opacity: 1,
      },
    };
  },
  props: {
    modalVisible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
      ...mapState([
      'operators',
    ]),
    windowWidth() {
      return Dimensions.get("window").width;
    },
    windowHeight() {
      return Dimensions.get("window").height;
    },
  },
  methods: {
    close() {
      this.modalVisible = false;
         this.$emit('closeModel', this.modalVisible)
    },
    selectOperator (op) {
        this.$emit('handleModelOutput', op)

        this.modalVisible = false;
          this.$emit('closeModel', this.modalVisible)
    }
  },
};
</script>

<style>
.modal-background {
  background-color: rgba(0, 0, 0, 0.45);
}
.modal-container {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  top: 57.2%;
  padding-top: 7%;
  padding-left: 5.6%;
  padding-right: 5.6%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.modal-content {
  display: flex;
  flex-direction: column;
}
.modal-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6%;
}
.modtal-top-title {
  font-size: 16px;
  color: #131315;
}
.divider {
  width: 100%;
  height: 1px;
  background-color: #dfe4ee;
  margin-bottom: 4%;
}
.scroll-container {
  width: 100%;
  height: 100%;
}
.modal-bottom {
  display: flex;
  flex-direction: column;
}
.modal-bottom-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 7%;
}
.modal-bottom-row-text {
  margin-left: 4.7%;
  font-size: 16px;
  font-weight: bold;
  color: #131315;
}
</style>

<template>
  <view class="staking-component-container">
    <view
      class="button-container"
      :style="{
        width: windowWidth * styles.valueWrapWidth,
      }"
    >
      <!-- <animatedView> -->
      <touchable-opacity
        class="button-comp"
        :on-press="() => changeTab('Stake')"
      >
        <text
          :class="{
            selected: activeTab === 'Stake',
            'button-name': activeTab !== 'Stake',
          }"
          >Stake</text
        >
      </touchable-opacity>
      <touchable-opacity
        class="button-comp"
        :on-press="() => changeTab('ReStake')"
      >
        <text
          :class="{
            selected: activeTab === 'ReStake',
            'button-name': activeTab !== 'ReStake',
          }"
          >Re-Stake</text
        >
      </touchable-opacity>
      <!-- </animatedView> -->
      <touchable-opacity
        class="button-comp"
        :on-press="() => changeTab('Unstake')"
      >
        <text
          :class="{
            selected: activeTab === 'Unstake',
            'button-name': activeTab !== 'Unstake',
          }"
          >Unstake</text
        >
      </touchable-opacity>
      <touchable-opacity
        class="button-comp"
        :on-press="() => changeTab('Withdraw')"
      >
        <text
          :class="{
            selected: activeTab === 'Withdraw',
            'button-name': activeTab !== 'Withdraw',
          }"
          >Withdraw</text
        >
      </touchable-opacity>
    </view>
    <!-- <Stake tab> -->
    <view
      v-if="activeTab === 'Stake'"
      class="value-wrap"
      :style="{
        width: windowWidth * styles.valueWrapWidth,
        height: windowHeight * 0.31,
      }"
    >
      <view
        class="value-row value-row-first"
        :style="{ height: windowHeight * styles.valueBalanceFirstHeight }"
      >
        <text class="value-row-text">Balance : </text>
        <text class="value-row-value">{{ currencyAmount(tonBalance) }}</text>
      </view>
      <view
        class="value-row value-row-sb"
        :style="{
          height: windowHeight * styles.valueBalanceFirstHeight,
          marginBottom: '3%',
        }"
      >
        <view class="value-row-second-input">
          <text-input
            v-model="amountToDelegate"
            placeholder="0.00"
            autocomplete="off"
            minlength="1"
            maxlength="1"
            keyboardType="number-pad"
            class="text-input"
            @onChange="isNumber"
          ></text-input>
          <text class="ton-text">TON</text>
        </view>
        <touchable-opacity
          class="value-row-second-touch"
          :on-press="() => setAvailableAmountToDelegate()"
        >
          <text
            class="value-row-second-max"
            :style="{ width: windowWidth * styles.valueBalanceSecondMax }"
            >MAX</text
          >
        </touchable-opacity>
      </view>
      <view
        class="value-row value-row-third value-row-border"
        :style="{
          height: windowHeight * styles.valueRowThirdheight,
          justifyContent: 'space-between',
        }"
      >
        <text class="value-row-third-text">Select an operator </text>
        <touchable-opacity :on-press="handleBtnPress">
          <view class="input-icon-container">
            <image
              class="value-icon"
              :style="{
                height: windowHeight * 0.031,
                width: windowWidth * 0.056,
                resizeMode: 'contain',
                opacity: 0.12,
              }"
              :source="TokamakIcon"
            ></image>
            <text class="value-row-thrid-select">{{ selectedOperator }}</text>
            <image
              :style="{
                height: windowHeight * 0.012,
                width: windowWidth * 0.025,
                resizeMode: 'contain',
              }"
              :source="IconSelect"
            ></image>
          </view>
        </touchable-opacity>
      </view>
      <touchable-opacity :on-press="() => handleFeeModel('delegate')">
        <button-main
          title="Stake"
          :style="{ marginBottom: '4.5%' }"
        ></button-main>
      </touchable-opacity>
    </view>
    <!-- <Re-stale tab> -->
    <view
      v-if="activeTab === 'ReStake'"
      class="value-wrap"
      :style="{
        width: windowWidth * styles.valueWrapWidth,
        height: windowHeight * 0.31,
      }"
    >
      <view
        class="value-row value-row-first"
        :style="{ height: windowHeight * styles.valueBalanceFirstHeight }"
      >
        <text class="value-row-text">Re-stake Amount : </text>
      </view>
      <view
        class="value-row"
        :style="{
          height: windowHeight * styles.valueBalanceFirstHeight,
          marginBottom: '3%',
        }"
      >
        <text
          class="withdraw-value-row-input"
          :style="{ height: windowHeight * styles.valueBalanceFirstHeight }"
          >{{ currencyAmount(operator.userNotWithdrawable) }}</text
        >
      </view>
      <view
        class="value-row value-row-third value-row-border"
        :style="{
          height: windowHeight * styles.valueRowThirdheight,
          justifyContent: 'space-between',
        }"
      >
        <text class="value-row-third-text">Select an operator </text>
        <touchable-opacity :on-press="handleBtnPress">
          <view class="input-icon-container">
            <image
              class="value-icon"
              :style="{
                height: windowHeight * 0.031,
                width: windowWidth * 0.056,
                resizeMode: 'contain',
                opacity:0.12,
              }"
              :source="TokamakIcon"
            ></image>
            <text class="value-row-thrid-select">{{ selectedOperator }}</text>
            <image
              :style="{
                height: windowHeight * 0.012,
                width: windowWidth * 0.025,
                resizeMode: 'contain',
              }"
              :source="IconSelect"
            ></image>
          </view>
        </touchable-opacity>
      </view>
      <touchable-opacity :on-press="() => handleFeeModel('redelegate')">
        <button-main title="Re-Stake"></button-main>
      </touchable-opacity>
    </view>
    <!-- <Unstake tab> -->
    <view
      v-if="activeTab === 'Unstake'"
      class="value-wrap"
      :style="{
        width: windowWidth * styles.valueWrapWidth,
        height: windowHeight * 0.31,
      }"
    >
      <view
        class="value-row value-row-first"
        :style="{ height: windowHeight * styles.valueBalanceFirstHeight }"
      >
        <text class="value-row-text">Balance : </text>
        <text class="value-row-value">{{
          currencyAmount(operator.userStaked)
        }}</text>
      </view>
      <view
        class="value-row value-row-sb"
        :style="{
          height: windowHeight * styles.valueBalanceFirstHeight,
          marginBottom: '3%',
        }"
      >
        <view class="value-row-second-input">
          <text-input
            v-model.number="amountToUndelegate"
            placeholder="0.00"
            autocomplete="off"
            minlength="1"
            maxlength="1"
            keyboardType="number-pad"
            class="text-input"
          ></text-input>
          <text class="ton-text">TON</text>
        </view>
        <touchable-opacity
          class="value-row-second-touch"
          :on-press="() => setAvailableAmountToUndelegate()"
        >
          <text
            class="value-row-second-max"
            :style="{ width: windowWidth * styles.valueBalanceSecondMax }"
            >MAX</text
          >
        </touchable-opacity>
      </view>
      <view
        class="value-row value-row-third value-row-border"
        :style="{
          height: windowHeight * styles.valueRowThirdheight,
          justifyContent: 'space-between',
        }"
      >
        <text class="value-row-third-text">Select an operator </text>
        <touchable-opacity :on-press="handleBtnPress">
          <view class="input-icon-container">
            <image
              class="value-icon"
              :style="{
                height: windowHeight * 0.031,
                width: windowWidth * 0.056,
                resizeMode: 'contain',
                opacity:0.12,
              }"
              :source="TokamakIcon"
            ></image>
            <text class="value-row-thrid-select">{{ selectedOperator }}</text>
            <image
              :style="{
                height: windowHeight * 0.012,
                width: windowWidth * 0.025,
                resizeMode: 'contain',
              }"
              :source="IconSelect"
            ></image>
          </view>
        </touchable-opacity>
      </view>
      <touchable-opacity :on-press="() => handleFeeModel('undelegate')">
        <button-main title="Unstake"></button-main>
      </touchable-opacity>
    </view>
    <!-- <Withdraw tab> -->
    <view
      v-if="activeTab === 'Withdraw'"
      class="value-wrap"
      :style="{
        width: windowWidth * styles.valueWrapWidth,
        height: windowHeight * 0.31,
      }"
    >
      <view
        class="value-row value-row-first"
        :style="{ height: windowHeight * styles.valueBalanceFirstHeight }"
      >
        <text class="value-row-text">Widhdrawable Amount : </text>
      </view>
      <view
        class="value-row"
        :style="{
          height: windowHeight * styles.valueBalanceFirstHeight,
          marginBottom: '3%',
        }"
      >
        <text
          class="withdraw-value-row-input"
          :style="{ height: windowHeight * styles.valueBalanceFirstHeight }"
          >{{ currencyAmount(operator.userWithdrawable) }}</text
        >
      </view>
      <view
        class="value-row value-row-third value-row-border"
        :style="{
          height: windowHeight * styles.valueRowThirdheight,
          justifyContent: 'space-between',
        }"
      >
        <text class="value-row-third-text">Select an operator </text>
        <touchable-opacity :on-press="handleBtnPress">
          <view class="input-icon-container">
            <image
              class="value-icon"
              :style="{
                height: windowHeight * 0.031,
                width: windowWidth * 0.056,
                resizeMode: 'contain',
                opacity:0.12,
              }"
              :source="TokamakIcon"
            ></image>
            <text class="value-row-thrid-select">{{ selectedOperator }}</text>
            <image
              :style="{
                height: windowHeight * 0.012,
                width: windowWidth * 0.025,
                resizeMode: 'contain',
              }"
              :source="IconSelect"
            ></image>
          </view>
        </touchable-opacity>
      </view>
      <touchable-opacity :on-press="() => handleFeeModel('withdraw')">
        <button-main title="Withdraw"></button-main>
      </touchable-opacity>
    </view>
    <alert
      :modalVisible="alertVisibility"
      :width="0.889"
      :height="0.242"
      :message="message"
      @closePopup="closePopUp"
    ></alert>
    <select-operator
      :modalVisible="actionSheetVisibility"
      @closeModel="closeModel"
      @handleModelOutput="handleModelOutput"
    ></select-operator>
    <fee
      :modalVisible="feeModelVisibility"
      @getCustomValues="getCustomValues"
      @closeFeeModel="closeFeeModel"
      :slowPrice="slowPrice"
      :normalPrice="normalPrice"
      :fastPrice="fastPrice"
      :gasLimit="gasLimit"
    ></fee>
    <!-- <pending :modalVisible="activeTab === 'Unstake' ? true : false"></pending> -->
  </view>
</template>

<script>
import ButtonMain from "@/components/ButtonMain";
import { ToastAndroid } from "react-native";
import Divider from "@/components/Divider";
import Alert from "@/components/Alert";
import SelectOperator from "@/components/SelectOperator";
import Fee from "@/components/Fee";
import Pending from "@/components/Pending";
import IconTokamak from "../../assets/tokamak.png";
import IconSelect from "../../assets/select.png";
import { ActionSheet } from "native-base";
import { Dimensions } from "react-native";
import { NativeModules } from "react-native";
const { BlockchainModule } = NativeModules;
import { createCurrency } from "@makerdao/currency";
import { BN, padLeft } from "web3-utils";
import { range } from "lodash";
import { mapState, mapGetters } from "vuex";
import TokamakIcon from "../../assets/TokamakLogo.png";
import DSRVIcon from "../../assets/dsrv.png";
import DXMIcon from "../../assets/dxm.png";
const _TON = createCurrency("TON");
const _WTON = createCurrency("WTON");
export default {
  props: ["layer2Address", "selectedOperatorName"],
  data() {
    return {
      TokamakIcon,
      DSRVIcon,
      DXMIcon,
      activeTab: "Stake",
      selectedOperator: this.selectedOperatorName,
      amount: "",
      layer2: this.layer2Address,
      amountToDelegate: "0",
      amountToUndelegate: "0",
      alertVisibility: false,
      message: "",
      actionSheetVisibility: false,
      feeModelVisibility: false,
      selectedFunction: "",
      price: 0,
      limit: 0,
      index: 0,
      slowPrice: 0,
      normalPrice: 0,
      fastPrice: 0,
      gasLimit: 0,
      //
      styles: {
        valueWrapWidth: 0.889,
        valueWrapHeight: 0.48,
        valueBalanceFirstHeight: 0.055,
        valueBalanceSecondMax: 0.22,
        valueRowThirdheight: 0.062,
      },
      //
      IconTokamak,
      IconSelect,
    };
  },
  components: {
    "button-main": ButtonMain,
    divider: Divider,
    alert: Alert,
    "select-operator": SelectOperator,
    fee: Fee,
    pending: Pending,
  },
  computed: {
    ...mapState([
      "operators",
      "tonBalance",
      "web3",
      "blockNumber",
      "user",
      "TON",
      "WTON",
      "DepositManager",
      "SeigManager",
    ]),
    ...mapGetters(["operatorByLayer2"]),
    operator() {
      return this.operatorByLayer2(this.layer2);
    },
    currencyAmount() {
      return (amount) => this.$options.filters.currencyAmount(amount);
    },
    notWithdrawableMessage() {
      return (withdrawableBlockNumber) =>
        `You have to wait for ${withdrawableBlockNumber -
          this.blockNumber} blocks to withdraw all the tokens.`;
    },
    withdrawableRequests() {
      return this.operator.withdrawalRequests.length;
    },
    redelegatableRequests() {
      return this.operator.withdrawalRequests.length - this.index;
    },
    redelegatableAmount() {
      let amount = new BN(0);
      for (const i of range(this.redelegatableRequests)) {
        amount = amount.add(new BN(this.operator.withdrawalRequests[i].amount));
      }
      return _WTON(amount.toString(), "ray");
    },
    disableButton() {
      return false;
    },
    windowWidth() {
      return Dimensions.get("window").width;
    },
    windowHeight() {
      return Dimensions.get("window").height;
    },
    hexSlicer() {
      return (address) => this.$options.filters.hexSlicer(address);
    },
  },

  methods: {
    changeTab(tab) {
      this.feeModelVisibility = false;
      this.activeTab = tab;
    },
    selectFirstOperator() {
      this.selectedOperator = this.operators[0];
    },
    closePopUp(close) {
      this.alertVisibility = close;
    },
    onlyNumber(e) {
      const key = e.key;

      // If is '.' key, stop it
      if (key === ".") return e.preventDefault();

      // OPTIONAL
      // If is 'e' key, stop it
      if (key === "e") return e.preventDefault();
    },
    async delegate() {
      const amount = _TON(this.amountToDelegate).toFixed("wei");
      const data = this.getData();
      const status = await BlockchainModule.approveAndCall(
        this.TON,
        "approveAndCall",
        this.price.toString(),
        this.limit.toString(),
        this.WTON,
        amount,
        data
      );
      if (status.code === 0) {
        this.index = 0;
        ToastAndroid.show(
          "Transaction " + `${this.hexSlicer(status.hash)  }` + "successfully added to queue" ,
          ToastAndroid.LONG
        );
        const transaction = {
          from: this.user,
          type: "Delegated",
          amount: amount,
          transactionHash: status.hash,
          target: this.operator.layer2,
        };
        this.$store.dispatch("addPendingTransaction", transaction);
        this.$store.dispatch("setOperators");
        this.$store.dispatch("setBalance");
        this.$store.dispatch("setRounds");
        this.$store.dispatch("setCurrentRound");
        this.$store.dispatch("checkPendingTransactions");
        this.amountToDelegate = "";
      } else {
        ToastAndroid.show("Transaction Unsuccessful", ToastAndroid.SHORT);
      }
    },
    marshalString(str) {
      if (str.slice(0, 2) === "0x") return str;
      return str;
    },
    unmarshalString(str) {
      if (str.slice(0, 2) === "0x") return str.slice(2);
      return str;
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      const charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    getData() {
      const data = this.marshalString(
        [this.DepositManager, this.operator.layer2]
          .map(this.unmarshalString)
          .map((str) => padLeft(str, 64))
          .join("")
      );
      return data;
    },
    async undelegate() {
      const amount = _WTON(this.amountToUndelegate).toFixed("ray");
      const status = await BlockchainModule.requestWithdrawal(
        this.DepositManager,
        "requestWithdrawal",
        this.price.toString(),
        this.limit.toString(),
        this.operator.layer2,
        amount
      );
      if (status.code === 0) {
        this.index = 0;
        ToastAndroid.show(
           "Transaction " + `${this.hexSlicer(status.hash)  }` + "successfully added to queue" ,
          ToastAndroid.LONG
        );
        const transaction = {
          from: this.user,
          type: "Undelegated",
          amount: amount,
          transactionHash: status.hash,
          target: this.operator.layer2,
        };
        this.$store.dispatch("addPendingTransaction", transaction);
        this.$store.dispatch("setOperators");
        this.$store.dispatch("setBalance");
        this.$store.dispatch("setCurrentRound");
        this.$store.dispatch("setRounds");
        this.$store.dispatch("checkPendingTransactions");
        this.amountToUndelegate = "";
        this.index = 0;
      } else {
        "Transaction " + `${this.hexSlicer(status.hash)  }` + "successfully added to queue" ,
          ToastAndroid.LONG
      }
    },
    async redelegate() {
      const amount = this.redelegatableAmount.toFixed("ray");
      const status = await BlockchainModule.requestWithdrawal(
        this.DepositManager,
        "redepositMulti",
        this.price.toString(),
        this.limit.toString(),
        this.operator.layer2,
        this.redelegatableRequests.toString()
      );
      if (status.code === 0) {
        this.index = 0;
        ToastAndroid.show(
          "Transaction " + `${this.hexSlicer(status.hash)  }` + "successfully added to queue" ,
          ToastAndroid.LONG
        );
        const transaction = {
          from: this.user,
          type: "Redelegated",
          amount: amount,
          transactionHash: status.hash,
          target: this.operator.layer2,
        };
        this.$store.dispatch("addPendingTransaction", transaction);
        this.$store.dispatch("setOperators");
        this.$store.dispatch("setBalance");
        this.$store.dispatch("setRounds");
        this.$store.dispatch("setCurrentRound");

        this.$store.dispatch("checkPendingTransactions");
        this.amountToUndelegate = "";
        this.index = 0;
      } else {
        ToastAndroid.show("Transaction Unsuccessful", ToastAndroid.SHORT);
      }
    },
    async withdraw() {
      const amount = _WTON(this.operator.userWithdrawable).toFixed("ray");
      const count = this.operator.withdrawableRequests.length;
      const status = await BlockchainModule.withdraw(
        this.DepositManager,
        "processRequests",
        this.price.toString(),
        this.limit.toString(),
        this.operator.layer2,
        count.toString(),
        true
      );
      if (status.code === 0) {
        this.index = 0;
        ToastAndroid.show(
          "Transaction successfully added to queue",
          ToastAndroid.SHORT
        );
        const transaction = {
          from: this.user,
          type: "Withdrawn",
          amount: amount,
          transactionHash: status.hash,
          target: this.operator.layer2,
        };
        this.$store.dispatch("addPendingTransaction", transaction);
        this.$store.dispatch("setOperators");
        this.$store.dispatch("setBalance");
        this.$store.dispatch("setRounds");
        this.$store.dispatch("setCurrentRound");
        this.$store.dispatch("checkPendingTransactions");
        this.amountToUndelegate = "";
        this.index = 0;
      } else {
        ToastAndroid.show("Transaction Unsuccessful", ToastAndroid.SHORT);
      }
    },
    setAvailableAmountToDelegate() {
      const tonAmount = this.tonBalance.toBigNumber().toString();
      const index = tonAmount.indexOf(".");
      if (index === -1) {
        this.amountToDelegate = tonAmount + ".00";
      } else {
        this.amountToDelegate = tonAmount;
      }
    },
    setAvailableAmountToUndelegate() {
      const tonAmount = this.operator.userStaked.toBigNumber().toString();
      const index = tonAmount.indexOf(".");
      if (index === -1) {
        this.amountToUndelegate = tonAmount + ".00";
      } else {
        this.amountToUndelegate = tonAmount;
      }
    },
    handleBtnPress() {
      this.actionSheetVisibility = true;
    },
    closeModel(result) {
      this.actionSheetVisibility = result;
    },
    handleModelOutput(result) {
      const operator = this.operators.find(
        (operator) => operator.name === result
      );
      const root = operator.layer2;
      this.layer2 = root;
      this.selectedOperator = operator.name;
    },
    closeFeeModel() {
      this.feeModelVisibility = false;
    },
    getCustomValues(price, limit) {
      this.price = price;
      this.limit = limit;
      if (this.selectedFunction === "delegate") {
        this.feeModelVisibility = false;
        this.delegate();
      }
      if (this.selectedFunction === "undelegate") {
        this.feeModelVisibility = false;
        this.undelegate();
      }
      if (this.selectedFunction === "redelegate") {
        this.feeModelVisibility = false;
        this.redelegate();
      }
      if (this.selectedFunction === "withdraw") {
        this.feeModelVisibility = false;
        this.withdraw();
      }
    },
    async handleFeeModel(func) {
      BlockchainModule.getFeeInfo((fast, normal, slow) => {
        this.slowPrice = slow;
        this.normalPrice = normal;
        this.fastPrice = fast;
      });
      if (func === "delegate") {
        if (
          this.amountToDelegate === "0" ||
          parseFloat(this.amountToDelegate) === 0
        ) {
          this.message = "Please input a valid TON amount";
          this.alertVisibility = true;
        } else if (_TON(this.amountToDelegate).gt(this.tonBalance)) {
          this.message = "Please input a valid TON amount";
          this.alertVisibility = true;
        } else {
          const amount = _TON(this.amountToDelegate).toFixed("wei");
          const data = this.getData();
          const gasValue = await BlockchainModule.esitmatedGasLimitForDelegate(
            this.TON,
            "approveAndCall",
            this.WTON,
            amount,
            data
          );

          const gasVal = parseInt(gasValue);
          this.gasLimit = gasVal;
          this.feeModelVisibility = true;
          this.selectedFunction = "delegate";
        }
      } else if (func === "undelegate") {
        if (
          this.amountToUndelegate === "0" ||
          parseInt(this.amountToUndelegate) === 0
        ) {
          this.message = "Please input a valid TON amount";
          this.alertVisibility = true;
        } else if (
          _WTON(this.amountToUndelegate).gt(this.operator.userStaked)
        ) {
          this.message = "Please input a valid TON amount";
          this.alertVisibility = true;
        } else {
          const amount = _WTON(this.amountToUndelegate).toFixed("ray");
          const gasValue = await BlockchainModule.esitmatedGasLimitForRequestWithdrawal(
            this.DepositManager,
            "requestWithdrawal",
            this.operator.layer2,
            amount
          );
          const gasVal = parseInt(gasValue);
          this.gasLimit = gasVal;
          this.feeModelVisibility = true;
          this.selectedFunction = "undelegate";
        }
      } else if (func === "redelegate") {
        if (this.operator.withdrawalRequests.length === 0) {
          this.message = "Redelegatable amount is 0.";
          this.alertVisibility = true;
        } else {
          const amount = this.redelegatableAmount.toFixed("ray");
          const gasValue = await BlockchainModule.esitmatedGasLimitForRequestWithdrawal(
            this.DepositManager,
            "redepositMulti",
            this.operator.layer2,
            this.redelegatableRequests.toString()
          );
          const gasVal = parseInt(gasValue);
          this.gasLimit = gasVal;
          this.feeModelVisibility = true;
          this.selectedFunction = "redelegate";
        }
      } else if ("withdraw") {
        const count = this.operator.withdrawableRequests.length;
        const userWithdrawable = this.operator.userWithdrawable;
        if (userWithdrawable.isEqual(_WTON.ray("0"))) {
          this.message = "Withdrawable amount is 0.";
          this.alertVisibility = true;
        } else if (count === 0) {
          this.message = "Withdrawable amount is 0.";
          this.alertVisibility = true;
        } else {
          const gasValue = await BlockchainModule.esitmatedGasLimitForWithdraw(
            this.DepositManager,
            "processRequests",
            this.operator.layer2,
            count.toString(),
            true
          );
          const gasVal = parseInt(gasValue);
          this.gasLimit = gasVal;
          this.feeModelVisibility = true;
          this.selectedFunction = "withdraw";
        }
      }
    },
  },
};
</script>
<style scoped>
.staking-component-container {
  width: 100%;
  background-color: #fafbfc;
  height: 100%;
}

.value-wrap {
  border-width: 1px;
  border-color: #e7ebf2;
  border-radius: 10px;
  padding-left: 6.2%;
  padding-right: 6.2%;
  padding-top: 3%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.value-row {
  display: flex;
  flex-direction: row;
}

.value-row-first {
  align-items: center;
}

.value-row-sb {
  justify-content: space-between;
  align-items: center;
  /* border-width: 1px;
  border-color: rebeccapurple; */
}

.value-row-text {
  font-size: 12px;
  color: #86929d;
}

.value-row-value {
  font-size: 13px;
  color: #3e495c;
}

.value-row-second-input {
  width: 67.4%;
  height: 100%;
  border-width: 1px;
  border-radius: 4px;
  border-color: #dfe4ee;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.ton-text {
  font-size: 13px;
  color: #3e495c;
  /* display: flex;
  align-items: center; */
}
.text-input {
  text-align: right;
  font-size: 13px;
  overflow: hidden;
  color: #86929d;
  width: 82%;
  margin-right: 1%;
}
.value-row-second-touch {
  height: 100%;
  border-width: 1px;
  border-color: #2a72e5;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.value-row-second-max {
  text-align: center;
  color: #2a72e5;
}

.value-row-border {
  border-width: 1px;
  border-radius: 4px;
  border-color: #dfe4ee;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
}

.unable-row {
  /* background-color: #e9edf1; */
}

.value-row-third {
  margin-bottom: 4.5%;
  align-items: center;
  display: flex;
  padding-right: 4.6%;
}

.value-row-thrid-amount {
  display: flex;
  flex-direction: row;
  padding-right: 4.6%;
  font-size: 13px;
  color: #3e495c;
}

.value-row-third-text {
  padding-left: 3.6%;
  font-size: 12px;
  color: #3e495c;
  /* margin-right: 17.9%; */
  font-size: 12px;
}

.input-icon-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.value-icon {
  /* margin-right: 5%; */
}

.value-row-thrid-select {
  font-weight: bold;
  font-size: 13px;
  color: #3e495c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 2.5%;
  padding-right: 3.6%;
}

.button-container {
  width: 88.9%;
  height: 5.6%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.9%;
  border-width: 1px;
  border-color: #e7ebf2;
  border-radius: 6px;
  padding-left: 0.9%;
  padding-right: 0.9%;
  background-color: #ffffff;
}
.button-comp {
  display: flex;
  width: 25%;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  align-items: center;
  position: relative;
  color: #818992;
}
.button-name {
  color: #818992;
  font-weight: bold;
}

.selected {
  width: 100%;
  height: 90%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 14%;
  border-radius: 5px;
  color: #ffffff;
  background-color: #2a72e5;
}
.total-balance {
  display: flex;
  align-self: flex-end;
  font-size: 15px;
  margin-bottom: 5px;
}
.main-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.input {
  text-align: right;
  height: 30px;
  font-size: 18px;
  width: 120px;
  overflow: hidden;
  margin-right: 5px;
  align-items: center;
  color: #555555;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 5px;
  display: flex;
}
.button-max {
  background-color: #ccd1d3;
  opacity: 0.5;
  width: 60px;
  display: flex;
  justify-content: center;
  align-self: stretch;
  align-items: center;
  position: relative;
  height: 30px;
  margin: 5px;
  border-width: 1;
  border-color: #ccd1d3;
  border-radius: 12px;
}
.dropdown {
  width: 70px;
  height: 20px;
  margin-top: 4px;
}
.dropdown-item {
  height: 10px;
  width: 70px;
  font-weight: bold;
}
.selectedOperator {
  padding-top: 3px;
  margin-left: 30px;
  width: 100px;
  font-weight: bold;
  font-size: 18px;
}
.withdraw-value-row-input {
  width: 100%;
  border-width: 1px;
  border-color: #dfe4ee;
  border-radius: 4px;
  text-align: right;
  padding: 4.1%;
  background-color: #e9edf1;
  display: flex;
  justify-content: center;
  align-self: stretch;
  align-items: center;
}
</style>

<template>
  <div>
    <el-steps :active="2" class="stepStyle">
      <el-step v-for="(item) in detection" :key="item.key">
        <template v-slot:description>
          <div class="topText">{{ item.modifyDate }}</div>
        </template>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'

export default {
  props: {
    detection: {
      type: Array,
      default: function () {
        return [
          {
            'modifyDate': '2023-01-09 19:22:47',
            'status': '已送检1',
            key: nanoid(11)
          },
          {
            'modifyDate': '2023-01-09 19:22:47',
            'status': '已送检2',
            key: nanoid(11)
          },
          {
            'modifyDate': '2023-01-09 19:22:47',
            'status': '已送检3',
            key: nanoid(11)
          },
          {
            'modifyDate': '2023-01-09 19:22:47',
            'status': '已送检4',
            key: nanoid(11)
          },
          {
            'modifyDate': '2023-01-09 19:22:47',
            'status': '已送检5',
            key: nanoid(11)
          },
          {
            'modifyDate': '2023-01-09 19:22:47',
            'status': '已送检6',
            key: nanoid(11)
          },
        ]
      }
    }
  },
  data() {
    return {
      status: [],
      modifyDate: [],
    }
  },
  mounted() {
    this.detection.forEach(elem => {
      this.modifyDate.push(elem.modifyDate)
      this.status.push(elem.status)
    })
    this.informationViewing()
  },
  methods: {
    informationViewing() {
      this.informaDalogin = true
      this.$nextTick(() => {
        const stepDom = document.querySelectorAll('.el-step__icon-inner')
        stepDom.forEach((elem, index) => {
          elem.textContent = this.status[index]
          if (index === stepDom.length - 1) {
            elem.className = 'overwritePseudoElements'
          }
        })
      })
    },
  }
}
</script>


<style lang="scss" scoped>
:deep .stepStyle {
  margin: 0 10%;
  padding: 20px;
  //完成
  .is-finish {
    .el-step__icon {
      width: 120px;
      height: 35px;
      font-size: 16px;
      color: #FFFFFF;
      background: #084383;
      border: 1px solid #084383;
      border-radius: 15.75px !important;
      padding: 0.3rem 1.2rem;
      text-align: center;
    }

    .el-step__line-inner {
      background: #084383;
      border-color: #084383;
    }
  }

  //准备
  .is-process {
    .el-step__icon {
      width: 120px;
      height: 35px;
      font-size: 16px;
      color: #084383;
      background: #fff;
      border: 1px solid #084383;
      border-radius: 15.75px !important;
      padding: 0.3rem 1.2rem;
      text-align: center;
    }

    .el-step__line {
      border: 1px dashed #084383;
      background: #FFFFFF;
    }
  }

  //等待
  .is-wait {
    .el-step__icon {
      width: 120px;
      height: 35px;
      font-size: 16px;
      color: #304254;
      background: #FFFFFF;
      border: 1px solid #084383;
      border-radius: 15.75px !important;
      padding: 0.3rem 1.2rem;
      text-align: center;
    }

    .el-step__line {
      border: 1px dashed #084383;
      background: #FFFFFF;
    }
  }

  .el-step__icon-inner {
    font-weight: 400;
  }

  .el-step__icon-inner {
    &::after {
      font-family: element-icons;
      content: '\e791';
      position: absolute;
      top: 6.5px;
      right: -14px;
      color: #084383;
      font-size: 22px;
    }
  }

  .overwritePseudoElements {
    &::after {
      display: none;
    }
  }

  .el-step__line {
    top: 17px !important;
    background: #084383;
  }

  .topText {
    margin-top: 1.8rem;
    font-size: 12px;
    color: #657890;
  }

  .topTextNmt {
    font-size: 12px;
    color: #657890;
  }
}
</style>


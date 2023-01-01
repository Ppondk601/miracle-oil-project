<template>
  <div class="content">
    <div class="header-content">
      <h2>น้ำมันเหลือง</h2>
      <h2>ช่วยอะไรคุณได้บ้าง?</h2>
    </div>
    <div class="main-content">
      <!-- LEFT CARD -->
      <div class="card left">
        <div class="image left">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/miracle-oil.appspot.com/o/properties-picfix1.png?alt=media&token=62045924-7a42-4e60-a8e1-e74c88a00a94"
          />
        </div>
        <div class="effect left">
          <h3>บรรเทาอาการปวด</h3>
          <div class="descript left">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              ex mollitia fuga incidunt quibusdam dolorum vitae excepturi
              pariatur exercitationem aliquam!
            </p>
          </div>
        </div>
      </div>
      <!-- MIDDLE CARD -->
      <div class="card middle">
        <div class="image middle">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/miracle-oil.appspot.com/o/properties-picfix2.png?alt=media&token=eecc218c-c069-4ebb-8f1d-7cea04d919a7"
          />
        </div>
        <div class="effect middle">
          <h3>บรรเทาอาการปวด</h3>
          <div class="descript middle">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              ex mollitia fuga incidunt quibusdam dolorum vitae excepturi
              pariatur exercitationem aliquam!
            </p>
          </div>
        </div>
      </div>
      <!-- RIGHT CARD -->
      <div class="card right">
        <div class="image right">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/miracle-oil.appspot.com/o/properties-picfix3.png?alt=media&token=45ecfab0-420f-4e18-afc3-58a046f520ab"
          />
        </div>
        <div class="effect right">
          <h3>บรรเทาอาการปวด</h3>
          <div class="descript right">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              ex mollitia fuga incidunt quibusdam dolorum vitae excepturi
              pariatur exercitationem aliquam!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  height: max-content;
  width: 100vw;
  .header-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  }
  .main-content {
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 90vh;

    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 33vw;

      .image {
        display: flex;
        height: 70%;
        width: 33vw;

        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
          aspect-ratio: 1/1;
        }
      }
      .effect {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 0.7rem;
        &.left {
          h3 {
            color: #5b9b50;
          }
        }
        &.middle {
          h3 {
            color: #d7b43c;
          }
        }
        &.right {
          h3 {
            color: #ff9051;
          }
        }
        .descript {
          width: 70%;
          display: flex;
          align-self: center;
          margin-top: 1rem;
          p {
            width: max-content;
            text-align: center;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 992px) {
  //แก้
  .content {
    margin-bottom: 1rem;
    .header-content {
      margin-top: 2rem;
    }
    .main-content {
      display: flex;
      flex-direction: column;
      height: max-content;
      .card {
        display: flex;
        flex-direction: row;
        width: 100vw;
        height: 35vh; 
        &.middle {
          display: flex;
          flex-direction: row-reverse;
          .image {
            padding-left: 0;
            padding-right: 3rem;
            margin-left: 1rem;
          }
        }
        .image {
          height: 100%;
          width: 60%;
          padding-left: 3rem;
          margin-right: 1rem;
          img {
            object-fit: contain;
            width: 100%;
            height: 100%;
          }
        }
        .effect {
          width: 40%;
          justify-content: center;
          align-items: start;
          padding-right: 3rem;
          h3 {
            padding-left: 1rem;
          }
          .descript {
            align-self: start;
            width: 70%;
            p {
              width: max-content;
            }
          }
          &.middle {
            padding-right: 0;
            padding-left: 3rem;
            align-items: end;
            h3 {
              padding-left: 0;
              padding-right: 1rem;
            }
            .descript {
              align-self: end;
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .content {
    height: max-content;
    margin-bottom: 2rem;
    .header-content {
      h2 {
        font-size: 1.7rem;
      }
    }
    .main-content {
      height: max-content;
      display: flex;
      flex-direction: column;
      .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 55vh;
        .image {
          padding: 0;
          margin: 0;
          width: 80%;
          height: 70%;
        }
        .effect {
          width: 100%;
          justify-content: center;
          align-items: center;
          padding: 0;
          margin: 0;
          .descript {
            width: 80%;
            align-self: center;
          }
        }
        &.middle {
          display: flex;
          flex-direction: column;
          .image {
            padding: 0;
            margin: 0;
          }
          .effect {
            justify-content: center;
            width: 100%;
            align-items: center;
            padding: 0;
            margin: 0;
            .descript {
              width: 80%;
              align-self: center;
            }
          }
        }
      }
    }
  }
}
</style>

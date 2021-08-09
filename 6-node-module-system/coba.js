const cetakNama = (nama) => `Hi, nama saya ${nama}`;
// console.log(cetakNama("ademnfauzi"));

const PI = 3.14;

const mahasiswa = {
   nama: "ademnfauzi",
   umur: 20,
   cetakMhs() {
      return `Halo nama saya ${this.nama} dan saya ${this.umur} tahun`;
   },
};

class Orang {
   constructor() {
      console.log("Objek Orang telah dibuat");
   }
}
// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

module.exports = {
   // antara namanya sama antara property dan valuenya maka tulis sekali aja
   cetakNama,
   PI,
   mhs: mahasiswa,
   Orang: Orang,
};

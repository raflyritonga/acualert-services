class BanjirInfoModel {
     constructor(namaPenggunaList, jenisKendaraanList, ketinggianAirList, lokasiList, ketinggianKendaraanDict) {
         this.namaPenggunaList = namaPenggunaList;
         this.jenisKendaraanList = jenisKendaraanList;
         this.ketinggianAirList = ketinggianAirList;
         this.lokasiList = lokasiList;
         this.ketinggianKendaraanDict = ketinggianKendaraanDict;
         this.textPenyertaList = [
             "Jalanan terendam banjir di sekitar",
             "Ada banjir parah di sekitar",
             "Terjadi banjir di",
         ];
         this.textPenyertaKalimat2 = [
             "karena ketinggian air mencapai", "ketinggian air di lokasi mencapai", "ketinggian air sudah berada di"
         ];
         this.textHimbauanList = [
             "Lebih baik sabar dan nungguin air surut",
             "Harap bersabar dan tunggu sampai air surut",
             "Jangan memaksaka untuk melewati area banjir",
         ];
         this.statusList = [
             "tidak bisa lewat", "tidak dapat melewati", "berbahaya jika lewat"
         ];
     }
 
     randomChoice(arr) {
         return arr[Math.floor(Math.random() * arr.length)];
     }
 
     generateKalimat1() {
         const namaPengguna = this.randomChoice(this.namaPenggunaList);
         const textPenyerta = this.randomChoice(this.textPenyertaList);
         const lokasi = this.randomChoice(this.lokasiList);
 
         const templateChoices = [
             `${textPenyerta} ${lokasi} nih, ${namaPengguna}!`,
             `${namaPengguna}, ${textPenyerta} ${lokasi}!`
         ];
 
         const randomTemplate = this.randomChoice(templateChoices);
 
         return randomTemplate;
     }
 
     generateKalimat2() {
         const jenisKendaraan = this.randomChoice(this.jenisKendaraanList);
         const ketinggianChassis = this.ketinggianKendaraanDict[jenisKendaraan];
         const ketinggianAir = this.randomChoice(this.ketinggianAirList);
         const status = this.randomChoice(this.statusList);
         const penyerta = this.randomChoice(this.textPenyertaKalimat2);
 
         const templateChoices = [
             `${jenisKendaraan} kamu ${status}, karena ${penyerta} ${ketinggianAir}cm.`,
             `${penyerta} ${ketinggianAir}cm, jadi ${jenisKendaraan} ${status}.`,
             `${jenisKendaraan} ${status}, ${penyerta} ${ketinggianAir}cm.`
         ];
 
         const randomTemplate = this.randomChoice(templateChoices);
 
         return randomTemplate.charAt(0).toUpperCase() + randomTemplate.slice(1);
     }
 
     generateKalimat3() {
         const ruteAlternatif = this.randomChoice(["Klik notifikasi untuk membuka rute alternatif", "Kamu dapat mencoba rute alternatif dengan klik notifikasi", "Klik notifikasi untuk ikuti rute alternatif"]);
 
         return `${ruteAlternatif}!`;
     }
 
     generateBanjirInfo() {
         const ketinggianAir = this.randomChoice(this.ketinggianAirList);
         const jenisKendaraan = this.randomChoice(this.jenisKendaraanList);
         const ketinggianChassis = this.ketinggianKendaraanDict[jenisKendaraan];
 
         if (ketinggianAir > ketinggianChassis) {
             const kalimatUtuh = `${this.generateKalimat1()} ${this.generateKalimat2()} ${this.generateKalimat3()}`;
             return kalimatUtuh;
         }
 
         return "Kendaraan aman untuk melintas.";
     }
 }
 
 // Contoh penggunaan
 // const banjirModel = new BanjirInfoModel(
 //     ["Hiskia", "Fattah", "Rizky", "John", "Rafly", "Indra"],
 //     ["Honda Beat", "Yamaha Mio", "Suzuki Hayate", "Yamaha Nmax", "Mitsubishi Xpander"],
 //     [30, 40, 50, 23, 32, 43, 21, 24, 34],
 //     ["Jl. Selayang", "Jl. Kapten Muslim", "Jl. Ahmad Yani", "Jl. M.T. Haryono", "Jl. Universitas"],
 //     {
 //         "Honda Beat": 28.0,
 //         "Yamaha Mio": 29.0,
 //         "Suzuki Hayate": 26.5,
 //         "Yamaha Nmax": 33.4,
 //         "Mitsubishi Xpander": 30.5
 //     }
 // );
 
 // console.log(banjirModel.generateBanjirInfo());
 
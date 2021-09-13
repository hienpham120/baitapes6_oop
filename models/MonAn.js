function MonAn(){
    this.maMonAn = "";
    this.tenMonAn = "";
    this.giaTien = "";
    this.linkAnh = "";
}

function Invoice() {
    this.mealId = 0;
    this.mealName = '';
    this.quantity = 0;
    this.price = 0;
    this.total = 0;
    this.calculateTotal = function() { //Tính tổng hoá đơn
        return this.quantity * this.price;
    }
}
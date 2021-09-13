var arrMonAn = [];
document.querySelector('#btnThemMonAn').onclick = function(){
    //Lấy thông tin người dùng nhập vào
    var monAn = new MonAn();
    monAn.maMonAn = document.querySelector('#maMonAn').value;
    monAn.tenMonAn = document.querySelector('#tenMonAn').value;
    monAn.giaTien = document.querySelector('#giaTien').value;
    monAn.linkAnh = document.querySelector('#linkAnh').value;

    //Đưa dữ liệu vào mảng
    arrMonAn.push(monAn);
    console.log('arrMonAn', arrMonAn);

    renderTableMonAn(arrMonAn);
}

function renderTableMonAn(arrMA) { //input
    //Từ mảng arrSV tạo ra 1 chuỗi html <tr> <td></td></tr>
    //arrSV = [{maSinhVien:'',....},{maSinhVien:'',....},{maSinhVien:'',....}]
    var content = '';
    for (var index = 0; index < arrMA.length; index++) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên
        var monAn = arrMA[index];
        //Từ dữ liệu sinh viên đó => tạo ra 1 chuỗi html tr
        var trMonAn = `
        <tr>
            <td>${monAn.maMonAn}</td>
            <td>${monAn.tenMonAn}</td>
            <td>${monAn.giaTien}</td>
            <td>${monAn.linkAnh} <img style="width: 100px;height:100px;"
                    src="https://photo2.tinhte.vn/data/attachment-files/2021/02/5354545_image.jpg" />
            </td>
            <td><button onclick = "xoaMonAn('${monAn.maMonAn}')" class="btn btn-danger">Xoá</button></td>
        </tr>
        `;
        content += trMonAn;
    }
    //Dom đến tbody trên giao diện để gán innerHTML vào
    document.querySelector('#tblDanhMucMonAn').innerHTML = content;

}

function xoaMonAn(maMAClick) {
    //alert(maMAClick);
    for (var index = arrMonAn.length - 1; index >= 0; index--) { //Xoá phần tử trùng nhau thì nên duyệt ngược mảng
        //Mỗi lần duyệt lấy ra 1 sinh viên
        var monAn = arrMonAn[index];
        //So sánh mã từng sinhViên trong mảng với maSinhVien từ nút xoá
        if(monAn.maMonAn === maMAClick) {
            arrMonAn.splice(index,1) //Xoá 1 phần tử trong mảng
        }
    }
    //Tạo lại table html mới từ mảng đã xoá
    renderTableMonAn(arrMonAn);

}

/**Bài 2:  */
var arrMeal = [
    { mealId: 1, mealName: "Nước lẩu haidilao", price: 100 },
    { mealId: 2, mealName: "Mì cay thành đô", price: 200 },
    { mealId: 3, mealName: "Mực bạch ngọc", price: 300 },
];

document.querySelector('#btnAddMeals').onclick = function(){
    arrMeal.mealId = document.querySelector('#mealId').value;
    arrMeal.mealName = document.querySelector('#mealName').value;
    arrMeal.price = document.querySelector('#mealPrice').value;
    //Đưa dữ liệu vào mảng
    // arrMonAn.push(monAn);
    console.log('arrMeal', arrMeal);
    renderMealTable();
    renderInvoiceTable();
}

function renderMealTable(arrMeal) { //input
    //Từ mảng arrSV tạo ra 1 chuỗi html <tr> <td></td></tr>
    //arrSV = [{maSinhVien:'',....},{maSinhVien:'',....},{maSinhVien:'',....}]
    var content = '';
    for (var index = 0; index < arrMeal.length; index++) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên
        var meal = arrMeal[index];
        //Từ dữ liệu sinh viên đó => tạo ra 1 chuỗi html tr
        var trMeal = `
        <tr>
            <td>${meal.mealId}</td>
            <td>${meal.mealName}</td>
            <td>${meal.mealPrice}</td>
        </tr>
        `;
        content += trMeal;
    }
    //Dom đến tbody trên giao diện để gán innerHTML vào
    document.querySelector('#tblListMeal').innerHTML = content;

}

function renderInvoiceTable(arrInvoices){
    arrInvoices.sort(function(a,b){
        return a.mealId - b.mealId;
    });
    var content = '';
    for(var index = 0; index < arrInvoices.length; index++){
        var trInvoice = `
        <tr>
        <td>${arrInvoices[i].mealId}</td>
        <td>${arrInvoices[i].mealName}</td>
        <td>${arrInvoices[i].quantity}</td>
        <td>${FormatCurrency(arrInvoices[i].total)}</td>
        </tr>
        `;
        content += trInvoice;

        if(index == arrInvoices.length -1){
            content += `
            <tr id="grand-total">
                <td></td>
                <td></td>
                <td><strong>Thành tiền</strong></td>
                <td id="value">${calculateGrandTotal()}</td>
            </tr>
            `;
        }
    }
  document.querySelector("#invoiceTable").innerHTML = content;
}

invoices = [];

function addMeal(mealId){
    var currentMeal = getMealFromInvoice(mealId);
    if(currentMeal != undefined){
        addQuantity(mealId);
    }else{
        var meal = getMealFromMenu(mealId);
        var invoice = new Invoice();
        invoice.mealId = meal.mealId;
        invoice.mealName = meal.mealName;
        invoice.price = meal.mealPrice;
        invoice.quantity = 1;
        invoices.total = invoice.calculateGrandTotal();
        invoices.push(invoice);
    }
}

function removeMeal(mealId){
    for(var index = 0; index < invoices.length; index++){
        if(invoices[i].mealId == mealId){
            if(invoices[i].quantity >= 2){
                invoices[i].quantity--;
                invoices[i].total = invoices[i].quantity * invoices[i].price;
            }else{
                invoices.splice(i, 1);
            }
        }
    }
    renderInvoiceTable(invoices);
}

function addQuantity(mealId){
    for(var index = 0; index < invoices.length; index++){
        if(invoices[i].mealId == mealId){
            ++invoices[i].quantity;
            invoices[i].total = invoices[i].quantity * invoices[i].price;
        }
    }
}

function getMealFromInvoice(mealId) {
    for (var i = 0; i < invoices.length; i++) {
        if (invoices[i].mealId == mealId) {
          return invoices[i];
        }
      }
      return undefined;
}

function getMealFromMenu(mealId) {
    for (var i = 0; i < arrMonAn.length; i++) {
        if (arrMonAn[i].maMonAn == mealId) {
          return arrMonAn[i];
        }
      }
      return undefined;
}

function calculateGrandTotal() {
    var grandTotal = 0;
    for(var i = 0; i < invoices.length; i++) {
      grandTotal += invoices[i].total;
    }
    return FormatCurrency(grandTotal);
}

function FormatCurrency(number) {
    return number.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'đ';
}
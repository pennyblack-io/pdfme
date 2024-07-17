import type { Lang, Dict } from '@pdfme/common';
import { DEFAULT_LANG } from './constants.js';

const dictEn: { [key in keyof Dict]: string } = {
  cancel: 'Cancel',
  field: 'field',
  fieldName: 'Name',
  align: 'Align',
  width: 'Width',
  height: 'Height',
  opacity: 'Opacity',
  rotate: 'Rotate',
  edit: 'Edit',
  plsInputName: 'Please input name',
  fieldMustUniq: 'Name of field is not unique',
  notUniq: '(Not unique name)',
  noKeyName: 'No name',
  fieldsList: 'Field List',
  editField: 'Edit Field',
  type: 'Type',
  errorOccurred: 'An error occurred',
  errorBulkUpdateFieldName:
    'Cannot commit the change because the number of items has been changed.',
  commitBulkUpdateFieldName: 'Commit Changes',
  bulkUpdateFieldName: 'Bulk update field names',
  addPageAfter: 'Add Page After',
  removePage: 'Remove Current Page',
  removePageConfirm: 'Are you sure you want to delete this page? This action cannot be undone.',
  hexColorPrompt: 'Please enter a valid hex color code.',
  'schemas.color': 'Color',
  'schemas.borderWidth': 'Border Width',
  'schemas.borderColor': 'Border Color',
  'schemas.backgroundColor': 'Background Color',
  'schemas.textColor': 'Text Color',
  'schemas.bgColor': 'Background Color',
  'schemas.horizontal': 'Horizontal',
  'schemas.vertical': 'Vertical',
  'schemas.left': 'Left',
  'schemas.center': 'Center',
  'schemas.right': 'Right',
  'schemas.top': 'Top',
  'schemas.middle': 'Middle',
  'schemas.bottom': 'Bottom',
  'schemas.padding': 'Padding',
  'schemas.text.fontName': 'Font Name',
  'schemas.text.size': 'Size',
  'schemas.text.spacing': 'Spacing',
  'schemas.text.textAlign': 'Text Align',
  'schemas.text.verticalAlign': 'Vertical Align',
  'schemas.text.lineHeight': 'Line Height',
  'schemas.text.min': 'Min',
  'schemas.text.max': 'Max',
  'schemas.text.fit': 'Fit',
  'schemas.text.dynamicFontSize': 'Dynamic Font Size',
  'schemas.text.format': 'Format',
  'schemas.barcodes.barColor': 'Bar Color',
  'schemas.barcodes.includetext': 'Include Text',
  'schemas.table.alternateBackgroundColor': 'Alternate Background Color',
  'schemas.table.tableStyle': 'Table Style',
  'schemas.table.headStyle': 'Header Style',
  'schemas.table.bodyStyle': 'Body Style',
  'schemas.table.columnStyle': 'Column Style',
};

const dictZh: { [key in keyof Dict]: string } = {
  cancel: '取消',
  field: '字段',
  fieldName: '名称',
  align: '对齐',
  width: '宽度',
  height: '高度',
  opacity: '透明度',
  rotate: '旋转',
  edit: '编辑',
  plsInputName: '请输入名称',
  fieldMustUniq: '字段名称必须唯一',
  notUniq: '（名称不唯一）',
  noKeyName: '无名称',
  fieldsList: '字段列表',
  editField: '编辑字段',
  type: '类型',
  errorOccurred: '发生错误',
  errorBulkUpdateFieldName: '由于项目数量已更改，无法提交更改。',
  commitBulkUpdateFieldName: '提交更改',
  bulkUpdateFieldName: '批量更新字段名称',
  addPageAfter: '在之后添加页面',
  removePage: '删除当前页面',
  removePageConfirm: '您确定要删除此页面吗？此操作无法撤销。',
  hexColorPrompt: '请输入有效的十六进制颜色代码。',
  'schemas.color': '颜色',
  'schemas.borderWidth': '边框宽度',
  'schemas.borderColor': '边框颜色',
  'schemas.backgroundColor': '背景颜色',
  'schemas.textColor': '文字颜色',
  'schemas.bgColor': '背景颜色',
  'schemas.horizontal': '水平',
  'schemas.vertical': '垂直',
  'schemas.left': '左',
  'schemas.center': '中',
  'schemas.right': '右',
  'schemas.top': '顶',
  'schemas.middle': '中间',
  'schemas.bottom': '底',
  'schemas.padding': '填充',
  'schemas.text.fontName': '字体名称',
  'schemas.text.size': '大小',
  'schemas.text.spacing': '间距',
  'schemas.text.textAlign': '文本对齐',
  'schemas.text.verticalAlign': '垂直对齐',
  'schemas.text.lineHeight': '行高',
  'schemas.text.min': '最小',
  'schemas.text.max': '最大',
  'schemas.text.fit': '适应',
  'schemas.text.dynamicFontSize': '动态字体大小',
  'schemas.text.format': '格式',
  'schemas.barcodes.barColor': '条码颜色',
  'schemas.barcodes.includetext': '包括文本',
  'schemas.table.alternateBackgroundColor': '交替背景颜色',
  'schemas.table.tableStyle': '表格样式',
  'schemas.table.headStyle': '表头样式',
  'schemas.table.bodyStyle': '表体样式',
  'schemas.table.columnStyle': '列样式',
};

const dictJa: { [key in keyof Dict]: string } = {
  cancel: 'キャンセル',
  field: '入力項目',
  fieldName: '項目名',
  align: '整列',
  width: '幅',
  height: '高さ',
  opacity: '不透明度',
  rotate: '回転',
  edit: '編集する',
  plsInputName: '項目名を入力してください',
  fieldMustUniq: '他の入力項目名と被っています',
  notUniq: '(他の項目名と重複しています)',
  noKeyName: '項目名なし',
  fieldsList: '入力項目一覧',
  editField: '入力項目を編集',
  type: 'タイプ',
  errorOccurred: 'エラーが発生しました',
  errorBulkUpdateFieldName: '項目数が変更されているため変更をコミットできません。',
  commitBulkUpdateFieldName: '変更を反映',
  bulkUpdateFieldName: '項目名を一括変更',
  addPageAfter: '次にページを追加',
  removePage: '現在のページを削除',
  removePageConfirm: 'ページを削除してもよろしいですか？この操作は元に戻せません。',
  hexColorPrompt: '有効な16進数のカラーコードを入力してください。',
  'schemas.color': '色',
  'schemas.borderWidth': '枠線の太さ',
  'schemas.borderColor': '枠線の色',
  'schemas.backgroundColor': '背景色',
  'schemas.textColor': 'テキストの色',
  'schemas.bgColor': '背景色',
  'schemas.horizontal': '水平',
  'schemas.vertical': '垂直',
  'schemas.left': '左',
  'schemas.center': '中央',
  'schemas.right': '右',
  'schemas.top': '上',
  'schemas.middle': '中間',
  'schemas.bottom': '下',
  'schemas.padding': 'パディング',
  'schemas.text.fontName': 'フォント名',
  'schemas.text.size': 'サイズ',
  'schemas.text.spacing': '間隔',
  'schemas.text.textAlign': 'テキストの揃え',
  'schemas.text.verticalAlign': '垂直方向の揃え',
  'schemas.text.lineHeight': '行の高さ',
  'schemas.text.min': '最小',
  'schemas.text.max': '最大',
  'schemas.text.fit': 'フィット',
  'schemas.text.dynamicFontSize': '動的フォントサイズ',
  'schemas.text.format': '書式',
  'schemas.barcodes.barColor': 'バーの色',
  'schemas.barcodes.includetext': 'テキストを含める',
  'schemas.table.alternateBackgroundColor': '交互の背景色',
  'schemas.table.tableStyle': 'テーブルスタイル',
  'schemas.table.headStyle': 'ヘッダースタイル',
  'schemas.table.bodyStyle': 'ボディスタイル',
  'schemas.table.columnStyle': 'カラムスタイル',
};

const dictKo: { [key in keyof Dict]: string } = {
  cancel: '취소',
  field: '필드',
  fieldName: '이름',
  align: '정렬',
  width: '너비',
  height: '높이',
  opacity: '투명도',
  rotate: '회전',
  edit: '편집',
  plsInputName: '이름을 입력하세요',
  fieldMustUniq: '필드 이름은 유일해야 합니다',
  notUniq: '（유일하지 않은 이름）',
  noKeyName: '이름 없음',
  fieldsList: '필드 목록',
  editField: '필드 편집',
  type: '유형',
  errorOccurred: '오류 발생',
  errorBulkUpdateFieldName: '항목 수가 변경되어 변경을 커밋할 수 없습니다.',
  commitBulkUpdateFieldName: '변경 사항 커밋',
  bulkUpdateFieldName: '필드 이름 일괄 업데이트',
  addPageAfter: '다음에 페이지 추가',
  removePage: '현재 페이지 제거',
  removePageConfirm: '이 페이지를 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.',
  hexColorPrompt: '유효한 16진수 색상 코드를 입력하세요.',
  'schemas.color': '색상',
  'schemas.borderWidth': '테두리 너비',
  'schemas.borderColor': '테두리 색상',
  'schemas.backgroundColor': '배경색',
  'schemas.textColor': '텍스트 색상',
  'schemas.bgColor': '배경색',
  'schemas.horizontal': '수평',
  'schemas.vertical': '수직',
  'schemas.left': '왼쪽',
  'schemas.center': '중앙',
  'schemas.right': '오른쪽',
  'schemas.top': '상단',
  'schemas.middle': '중간',
  'schemas.bottom': '하단',
  'schemas.padding': '패딩',
  'schemas.text.fontName': '글꼴 이름',
  'schemas.text.size': '크기',
  'schemas.text.spacing': '간격',
  'schemas.text.textAlign': '텍스트 정렬',
  'schemas.text.verticalAlign': '수직 정렬',
  'schemas.text.lineHeight': '줄 높이',
  'schemas.text.min': '최소',
  'schemas.text.max': '최대',
  'schemas.text.fit': '맞춤',
  'schemas.text.dynamicFontSize': '동적 폰트 크기',
  'schemas.text.format': '형식',
  'schemas.barcodes.barColor': '바코드 색상',
  'schemas.barcodes.includetext': '텍스트 포함',
  'schemas.table.alternateBackgroundColor': '대체 배경색',
  'schemas.table.tableStyle': '테이블 스타일',
  'schemas.table.headStyle': '헤더 스타일',
  'schemas.table.bodyStyle': '본문 스타일',
  'schemas.table.columnStyle': '열 스타일',
};

const dictAr: { [key in keyof Dict]: string } = {
  cancel: 'إلغاء',
  field: 'الحقل',
  fieldName: 'اسم الحقل',
  align: 'محاذاة',
  width: 'العرض',
  height: 'الارتفاع',
  opacity: 'الشفافية',
  rotate: 'تدوير',
  edit: 'تعديل',
  plsInputName: 'الرجاء إدخال الاسم',
  fieldMustUniq: 'يجب أن يكون الحقل فريداً',
  notUniq: '(غير فريد)',
  noKeyName: 'لا يوجد اسم للحقل',
  fieldsList: 'قائمة الحقول',
  editField: 'تعديل الحقل',
  type: 'النوع',
  errorOccurred: 'حدث خطأ',
  errorBulkUpdateFieldName: 'لا يمكن تنفيذ التغيير لأنه تم تغيير عدد العناصر.',
  commitBulkUpdateFieldName: 'تنفيذ التغييرات',
  bulkUpdateFieldName: 'تغيير الأسماء',
  addPageAfter: 'إضافة صفحة بعد',
  removePage: 'احذف الصفحة الحالية',
  removePageConfirm: 'هل أنت متأكد من رغبتك في حذف هذه الصفحة؟ لا يمكن التراجع عن هذا الإجراء.',
  hexColorPrompt: 'الرجاء إدخال رمز لون سداسي عشري صالح.',
  'schemas.color': 'اللون',
  'schemas.borderWidth': 'عرض الحدود',
  'schemas.borderColor': 'لون الحدود',
  'schemas.backgroundColor': 'لون الخلفية',
  'schemas.textColor': 'لون الخط',
  'schemas.bgColor': 'لون الخلفية',
  'schemas.horizontal': 'أفقي',
  'schemas.vertical': 'عمودي',
  'schemas.left': 'يسار',
  'schemas.center': 'مركز',
  'schemas.right': 'يمين',
  'schemas.top': 'أعلى',
  'schemas.middle': 'وسط',
  'schemas.bottom': 'أسفل',
  'schemas.padding': 'التبطين',
  'schemas.text.fontName': 'اسم الخط',
  'schemas.text.size': 'الحجم',
  'schemas.text.spacing': 'التباعد',
  'schemas.text.textAlign': 'محاذاة النص',
  'schemas.text.verticalAlign': 'محاذاة عمودية',
  'schemas.text.lineHeight': 'ارتفاع السطر',
  'schemas.text.min': 'الحد الأدنى',
  'schemas.text.max': 'الحد الأقصى',
  'schemas.text.fit': 'ملاءمة',
  'schemas.text.dynamicFontSize': 'حجم الخط الديناميكي',
  'schemas.text.format': 'تنسيق',
  'schemas.barcodes.barColor': 'لون الشريط',
  'schemas.barcodes.includetext': 'تضمين النص',
  'schemas.table.alternateBackgroundColor': 'لون الخلفية البديل',
  'schemas.table.tableStyle': 'أسلوب الجدول',
  'schemas.table.headStyle': 'أسلوب الرأس',
  'schemas.table.bodyStyle': 'أسلوب الجسم',
  'schemas.table.columnStyle': 'أسلوب العمود',
};

const dictTh: { [key in keyof Dict]: string } = {
  cancel: 'ยกเลิก',
  field: 'ฟิลด์',
  fieldName: 'ชื่อฟิลด์',
  align: 'จัดเรียง',
  width: 'ความกว้าง',
  height: 'ความสูง',
  opacity: 'ความทึบ',
  rotate: 'หมุน',
  edit: 'แก้ไข',
  plsInputName: 'กรุณาใส่ชื่อ',
  fieldMustUniq: 'ชื่อฟิลด์ต้องไม่ซ้ำกัน',
  notUniq: '(ชื่อฟิลด์ซ้ำกัน)',
  noKeyName: 'ไม่มีชื่อ',
  fieldsList: 'รายการฟิลด์ทั้งหมด',
  editField: 'แก้ไขฟิลด์',
  type: 'ประเภท',
  errorOccurred: 'เกิดข้อผิดพลาด',
  errorBulkUpdateFieldName: 'ไม่สามารถยืนยันการแก้ไขได้เนื่องจากจำนวนรายการมีการเปลี่ยนแปลง',
  commitBulkUpdateFieldName: 'ยืนยันการแก้ไข',
  bulkUpdateFieldName: 'แก้ไขชื่อฟิลด์เป็นชุด',
  addPageAfter: 'เพิ่มหน้าถัดไป',
  removePage: 'ลบหน้าปัจจุบัน',
  removePageConfirm: 'คุณแน่ใจหรือไม่ว่าต้องการลบหน้านี้? การกระทำนี้ไม่สามารถย้อนกลับได้',
  hexColorPrompt: 'กรุณาใส่รหัสสีแบบฐานสิบหกที่ถูกต้อง',
  'schemas.color': 'สี',
  'schemas.borderWidth': 'ความกว้างของเส้นขอบ',
  'schemas.borderColor': 'สีขอบ',
  'schemas.backgroundColor': 'สีพื้นหลัง',
  'schemas.textColor': 'สีข้อความ',
  'schemas.bgColor': 'สีพื้นหลัง',
  'schemas.horizontal': 'แนวนอน',
  'schemas.vertical': 'แนวตั้ง',
  'schemas.left': 'ซ้าย',
  'schemas.center': 'ตรงกลาง',
  'schemas.right': 'ขวา',
  'schemas.top': 'ด้านบน',
  'schemas.middle': 'ตรงกลาง',
  'schemas.bottom': 'ด้านล่าง',
  'schemas.padding': 'การเพิ่มพื้นที่',
  'schemas.text.fontName': 'ชื่อแบบอักษร',
  'schemas.text.size': 'ขนาด',
  'schemas.text.spacing': 'ระยะห่าง',
  'schemas.text.textAlign': 'จัดแนวข้อความ',
  'schemas.text.verticalAlign': 'จัดแนวแนวตั้ง',
  'schemas.text.lineHeight': 'ความสูงของบรรทัด',
  'schemas.text.min': 'ต่ำสุด',
  'schemas.text.max': 'สูงสุด',
  'schemas.text.fit': 'พอดี',
  'schemas.text.dynamicFontSize': 'ขนาดตัวอักษรแบบไดนามิก',
  'schemas.text.format': 'รูปแบบ',
  'schemas.barcodes.barColor': 'สีบาร์',
  'schemas.barcodes.includetext': 'รวมข้อความ',
  'schemas.table.alternateBackgroundColor': 'สีพื้นหลังสลับกัน',
  'schemas.table.tableStyle': 'สไตล์ตาราง',
  'schemas.table.headStyle': 'สไตล์หัวข้อ',
  'schemas.table.bodyStyle': 'สไตล์เนื้อหา',
  'schemas.table.columnStyle': 'สไตล์คอลัมน์',
};

const dictIt: { [key in keyof Dict]: string } = {
  cancel: 'Annulla',
  field: 'Campo',
  fieldName: 'Nome',
  align: 'Allinea',
  width: 'Larghezza',
  height: 'Altezza',
  opacity: 'Opacità',
  rotate: 'Ruota',
  edit: 'Modifica',
  plsInputName: 'Inserisci il nome per favore',
  fieldMustUniq: 'Il nome del campo non è univoco',
  notUniq: '(Nome non univoco)',
  noKeyName: 'Nessun nome',
  fieldsList: 'Lista campi',
  editField: 'Modifica campo',
  type: 'Tipo',
  errorOccurred: 'Riscontrato errore',
  errorBulkUpdateFieldName:
    'Non è possibile salvare le modifiche perché il numero di elementi è cambiato.',
  commitBulkUpdateFieldName: 'Salva cambiamenti',
  bulkUpdateFieldName: 'Modifica nomi campi in blocco',
  addPageAfter: 'Aggiungi pagina dopo',
  removePage: 'Rimuovi la Pagina Corrente',
  removePageConfirm:
    'Sei sicuro di voler eliminare questa pagina? Questa azione non può essere annullata.',
  hexColorPrompt: 'Inserisci un codice colore esadecimale valido.',
  'schemas.color': 'Colore',
  'schemas.borderWidth': 'Spessore bordo',
  'schemas.borderColor': 'Colore bordo',
  'schemas.backgroundColor': 'Colore di Sfondo',
  'schemas.textColor': 'Colore testo',
  'schemas.bgColor': 'Colore sfondo',
  'schemas.horizontal': 'Orizzontale',
  'schemas.vertical': 'Verticale',
  'schemas.left': 'Sinistra',
  'schemas.center': 'Centro',
  'schemas.right': 'Destra',
  'schemas.top': 'Sopra',
  'schemas.middle': 'Medio',
  'schemas.bottom': 'Sotto',
  'schemas.padding': 'Padding',
  'schemas.text.fontName': 'Nome del font',
  'schemas.text.size': 'Dimensione',
  'schemas.text.spacing': 'Spaziatura',
  'schemas.text.textAlign': 'Allineamento testo',
  'schemas.text.verticalAlign': 'Allineamento verticale',
  'schemas.text.lineHeight': 'Altezza della linea',
  'schemas.text.min': 'Minimo',
  'schemas.text.max': 'Massimo',
  'schemas.text.fit': 'Adatta',
  'schemas.text.dynamicFontSize': 'Dimensione font dinamica',
  'schemas.text.format': 'Formato',
  'schemas.barcodes.barColor': 'Colore barra',
  'schemas.barcodes.includetext': 'Includi testo',
  'schemas.table.alternateBackgroundColor': 'Colore di Sfondo Alternato',
  'schemas.table.tableStyle': 'Stile della Tabella',
  'schemas.table.headStyle': "Stile dell'Intestazione",
  'schemas.table.bodyStyle': 'Stile del Corpo',
  'schemas.table.columnStyle': 'Stile della Colonna',
};

const dictPl: { [key in keyof Dict]: string } = {
  cancel: 'Anuluj',
  field: 'pole',
  fieldName: 'Klucz pola',
  align: 'Wyrównanie',
  width: 'Szerokość',
  height: 'Wysokość',
  opacity: 'przezroczystość',
  rotate: 'Obrót',
  edit: 'Edytuj',
  plsInputName: 'Wymagane wprowadzenie klucza pola',
  fieldMustUniq: 'Klucz pola nie jest unikalny',
  notUniq: '(Klucz pola nie jest unikalny)',
  noKeyName: 'Brak nazwy klucza pola',
  fieldsList: 'Lista pól',
  editField: 'Edytuj pole',
  type: 'Typ pola',
  errorOccurred: 'Wystąpił błąd',
  errorBulkUpdateFieldName: 'Nie można wprowadzić zmian ponieważ liczba elementów uległa zmianie.',
  commitBulkUpdateFieldName: 'Zaakceptuj zmiany',
  bulkUpdateFieldName: 'Masowo aktualizuj klucze pól',
  addPageAfter: 'Dodaj stronę po',
  removePage: 'Usuń Bieżącą Stronę',
  removePageConfirm: 'Czy na pewno chcesz usunąć tę stronę? Tej operacji nie można cofnąć.',
  hexColorPrompt: 'Wprowadź poprawny kod koloru szesnastkowego.',
  'schemas.color': 'Kolor',
  'schemas.borderWidth': 'Szerokość obramowania',
  'schemas.borderColor': 'Kolor obramowania',
  'schemas.backgroundColor': 'Kolor tła',
  'schemas.textColor': 'Kolor tekstu',
  'schemas.bgColor': 'Kolor tła',
  'schemas.horizontal': 'Poziomo',
  'schemas.vertical': 'Pionowo',
  'schemas.left': 'Lewo',
  'schemas.center': 'Centrum',
  'schemas.right': 'Prawo',
  'schemas.top': 'Góra',
  'schemas.middle': 'Środek',
  'schemas.bottom': 'Dół',
  'schemas.padding': 'Odsadzenie',
  'schemas.text.fontName': 'Nazwa czcionki',
  'schemas.text.size': 'Rozmiar',
  'schemas.text.spacing': 'Odstępy',
  'schemas.text.textAlign': 'Wyrównanie tekstu',
  'schemas.text.verticalAlign': 'Wyrównanie pionowe',
  'schemas.text.lineHeight': 'Wysokość linii',
  'schemas.text.min': 'Minimum',
  'schemas.text.max': 'Maksimum',
  'schemas.text.fit': 'Dopasowanie',
  'schemas.text.dynamicFontSize': 'Dynamiczny rozmiar czcionki',
  'schemas.text.format': 'Format',
  'schemas.barcodes.barColor': 'Kolor paska',
  'schemas.barcodes.includetext': 'Dołącz tekst',
  'schemas.table.alternateBackgroundColor': 'Alternatywny kolor tła',
  'schemas.table.tableStyle': 'Styl tabeli',
  'schemas.table.headStyle': 'Styl nagłówka',
  'schemas.table.bodyStyle': 'Styl ciała',
  'schemas.table.columnStyle': 'Styl kolumny',
};

const dictDe: { [key in keyof Dict]: string } = {
  cancel: 'Abbrechen',
  field: 'Feld',
  fieldName: 'Name',
  align: 'Ausrichten',
  width: 'Breite',
  height: 'Höhe',
  opacity: 'Opazität',
  rotate: 'Drehen',
  edit: 'Bearbeiten',
  plsInputName: 'Bitte geben Sie einen Namen ein',
  fieldMustUniq: 'Feldname ist nicht eindeutig',
  notUniq: '(Nicht eindeutiger Name)',
  noKeyName: 'Kein Name',
  fieldsList: 'Feldliste',
  editField: 'Feld bearbeiten',
  type: 'Typ',
  errorOccurred: 'Ein Fehler ist aufgetreten',
  errorBulkUpdateFieldName:
    'Die Änderung kann nicht übernommen werden, weil die Anzahl der Elemente geändert wurde.',
  commitBulkUpdateFieldName: 'Änderungen übernehmen',
  bulkUpdateFieldName: 'Mehrfachaktualisierung der Feldnamen',
  addPageAfter: 'Seite danach hinzufügen',
  removePage: 'Aktuelle Seite entfernen',
  removePageConfirm:
    'Sind Sie sicher, dass Sie diese Seite löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
  hexColorPrompt: 'Bitte geben Sie einen gültigen Hex-Farbcode ein.',
  'schemas.color': 'Farbe',
  'schemas.borderWidth': 'Rahmenbreite',
  'schemas.borderColor': 'Rahmenfarbe',
  'schemas.backgroundColor': 'Hintergrundfarbe',
  'schemas.textColor': 'Textfarbe',
  'schemas.bgColor': 'Hintergrundfarbe',
  'schemas.horizontal': 'Horizontal',
  'schemas.vertical': 'Vertikal',
  'schemas.left': 'Links',
  'schemas.center': 'Zentriert',
  'schemas.right': 'Rechts',
  'schemas.top': 'Oben',
  'schemas.middle': 'Mitte',
  'schemas.bottom': 'Unten',
  'schemas.padding': 'Polsterung',
  'schemas.text.fontName': 'Schriftart',
  'schemas.text.size': 'Größe',
  'schemas.text.spacing': 'Abstand',
  'schemas.text.textAlign': 'Ausrichtung',
  'schemas.text.verticalAlign': 'vert. Ausr.',
  'schemas.text.lineHeight': 'Zeilenhöhe',
  'schemas.text.min': 'Min',
  'schemas.text.max': 'Max',
  'schemas.text.fit': 'Anpassen',
  'schemas.text.dynamicFontSize': 'Dynamische Schriftgröße',
  'schemas.text.format': 'Format',
  'schemas.barcodes.barColor': 'Strichcodefarbe',
  'schemas.barcodes.includetext': 'Text anzeigen',
  'schemas.table.alternateBackgroundColor': 'Wechselnde Hintergrundfarbe',
  'schemas.table.tableStyle': 'Tabellenstil',
  'schemas.table.headStyle': 'Kopfzeilenstil',
  'schemas.table.bodyStyle': 'Körperstil',
  'schemas.table.columnStyle': 'Spaltenstil',
};

const dictEs: { [key in keyof Dict]: string } = {
  cancel: 'Cancelar',
  field: 'campo',
  fieldName: 'Nombre',
  align: 'Alinear',
  width: 'Anchura',
  height: 'Altura',
  opacity: 'Opacidad',
  rotate: 'Rotar',
  edit: 'Editar',
  plsInputName: 'Introduce el nombre',
  fieldMustUniq: 'El nombre del campo no es único',
  notUniq: '(Nombre no único)',
  noKeyName: 'Sin nombre',
  fieldsList: 'Lista de campos',
  editField: 'Editar campo',
  type: 'Tipo',
  errorOccurred: 'Ocurrió un error',
  errorBulkUpdateFieldName:
    'No se puede confirmar el cambio porque el número de elementos ha cambiado.',
  commitBulkUpdateFieldName: 'Confirmar cambios',
  bulkUpdateFieldName: 'Actualizar en bloque el nombre de los campos',
  addPageAfter: 'Insertar página',
  removePage: 'Eliminar página actual',
  removePageConfirm:
    '¿Estás seguro de que quieres eliminar esta página? Esta acción no se puede deshacer.',
  hexColorPrompt: 'Introduce un código de color hexadecimal válido.',
  'schemas.color': 'Color',
  'schemas.borderWidth': 'Ancho del borde',
  'schemas.borderColor': 'Color del borde',
  'schemas.backgroundColor': 'Color de fondo',
  'schemas.textColor': 'Color del texto',
  'schemas.bgColor': 'Color del fondo',
  'schemas.horizontal': 'Horizontal',
  'schemas.vertical': 'Vertical',
  'schemas.left': 'Izquierda',
  'schemas.center': 'Centro',
  'schemas.right': 'Derecha',
  'schemas.top': 'Arriba',
  'schemas.middle': 'Medio',
  'schemas.bottom': 'Abajo',
  'schemas.padding': 'Relleno',
  'schemas.text.fontName': 'Nombre de la fuente',
  'schemas.text.size': 'Tamaño',
  'schemas.text.spacing': 'Espaciado',
  'schemas.text.textAlign': 'Alineación del texto',
  'schemas.text.verticalAlign': 'Alineación vertical',
  'schemas.text.lineHeight': 'Altura de línea',
  'schemas.text.min': 'Mín',
  'schemas.text.max': 'Máx',
  'schemas.text.fit': 'Ajustar',
  'schemas.text.dynamicFontSize': 'Tamaño de fuente dinámico',
  'schemas.text.format': 'Formato',
  'schemas.barcodes.barColor': 'Color de la barra',
  'schemas.barcodes.includetext': 'Incluir texto',
  'schemas.table.alternateBackgroundColor': 'Color de fondo alternativo',
  'schemas.table.tableStyle': 'Estilo de tabla',
  'schemas.table.headStyle': 'Estilo de cabecera',
  'schemas.table.bodyStyle': 'Estilo de cuerpo',
  'schemas.table.columnStyle': 'Estilo de columna',
};

const dictFr: { [key in keyof Dict]: string } = {
  cancel: 'Annuler',
  field: 'Champ',
  fieldName: 'Nom',
  align: 'Aligner',
  width: 'Largeur',
  height: 'Hauteur',
  opacity: 'Opacité',
  rotate: 'Rotation',
  edit: 'Éditer',
  plsInputName: 'Veuillez saisir le nom',
  fieldMustUniq:"Le nom du champ n'est pas unique",
  notUniq: '(Nombre non unique)',
  noKeyName: 'Pas de nom',
  fieldsList: 'Liste des champs',
  editField: 'Éditer le champ',
  type: 'Type',
  errorOccurred:'Une erreur est survenue',
  errorBulkUpdateFieldName: "Impossible de confirmer le changement car le nombre d'éléments a changé.",
  commitBulkUpdateFieldName: 'Confirmer les changements',
  bulkUpdateFieldName: 'Modifier les noms de champs en masse',
  addPageAfter: 'Ajouter une page après',
  removePage: 'Supprimer la page actuelle',
  removePageConfirm: 'Êtes-vous sûr de vouloir supprimer cette page ? Cette action est irréversible.',
  hexColorPrompt: 'Veuillez entrer un code couleur hexadécimal valide.',
  'schemas.color': 'Couleur',
  'schemas.borderWidth': 'Largeur de la bordure',
  'schemas.borderColor': 'Couleur de la bordure',
  'schemas.backgroundColor': 'Couleur de fond',
  'schemas.textColor': 'Couleur du texte',
  'schemas.bgColor': 'Couleur de fond',
  'schemas.horizontal': 'Horizontal',
  'schemas.vertical': 'Vertical',
  'schemas.left': 'Gauche',
  'schemas.center': 'Centre',
  'schemas.right': 'Droite',
  'schemas.top': 'Haut',
  'schemas.middle': 'Milieu',
  'schemas.bottom': 'Bas',
  'schemas.padding': 'Zone de remplissage',
  'schemas.text.fontName': 'Nom de la police',
  'schemas.text.size': 'Taille',
  'schemas.text.spacing': 'Espacement',
  'schemas.text.textAlign': 'Alignement du texte',
  'schemas.text.verticalAlign': 'Alignement vertical',
  'schemas.text.lineHeight': 'Hauteur de ligne',
  'schemas.text.min': 'Min',
  'schemas.text.max': 'Max',
  'schemas.text.fit': 'Ajustement',
  'schemas.text.dynamicFontSize': 'Taille de police dynamique',
  'schemas.text.format': 'Format',
  'schemas.barcodes.barColor': 'Couleur de la barre',
  'schemas.barcodes.includetext': 'Inclure le texte',
  'schemas.table.alternateBackgroundColor': 'Couleur de fond alternative',
  'schemas.table.tableStyle': 'Style de tableau',
  'schemas.table.headStyle': "Style d'en-tête",
  'schemas.table.bodyStyle': 'Style de corps',
  'schemas.table.columnStyle': 'Style de colonne'
};

const dictionaries: { [key in Lang]: Dict } = {
  en: dictEn,
  zh: dictZh,
  ja: dictJa,
  ko: dictKo,
  ar: dictAr,
  th: dictTh,
  it: dictIt,
  pl: dictPl,
  de: dictDe,
  es: dictEs,
  fr: dictFr,
};

export const getDict = (lang: Lang): Dict => dictionaries[lang] || dictionaries[DEFAULT_LANG];

export const i18n = (key: keyof Dict, dict?: Dict) => (dict || getDict(DEFAULT_LANG))[key];

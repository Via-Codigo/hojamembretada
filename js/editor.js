var generalBodyConfig = {
  menubar: false,
  inline: true,
  plugins: ["link", "lists", "autolink"],
  toolbar: [
    "undo redo | bold italic underline |  fontsizeselect",
    "forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent"
  ],
  valid_elements: "p[style],strong,em,span[style],a[href],ul,ol,li",
  valid_styles: {
    "*": "font-size,font-family,color,text-decoration,text-align"
  },
  // powerpaste_word_import: "clean",
  // powerpaste_html_import: "clean",
  content_css: ["https://fonts.googleapis.com/css?family=Oxygen"]
};

var generalFechaConfig = {
  menubar: false,
  inline: true,
  plugins: ["link", "lists", "autolink"],
  toolbar: [
    "undo redo | bold italic underline |  fontsizeselect",
    "forecolor   "
  ],
  valid_elements: "p[style],strong,em,span[style],a[href],ul,ol,li",
  valid_styles: {
    "*": "font-size,font-family,color,text-decoration,text-align"
  },
  // powerpaste_word_import: "clean",
  // powerpaste_html_import: "clean",
  content_css: ["https://fonts.googleapis.com/css?family=Oxygen"]
};

function initEditors() {
  var hojas = document.getElementsByClassName("hoja");
  for (let i = 0; i < hojas.length; i++) {
    generalFechaConfig.selector = `#fecha-${i}`;
    generalBodyConfig.selector = `#editor-${i}`;
    tinymce.init(generalFechaConfig);
    tinymce.init(generalBodyConfig);
  }
}

from PIL import Image, ImageEnhance, ImageFilter

class Filter:

    def __init__(self, file, output_file):
        self.file = file
        self.output_file = output_file

        self.image = Image.open(self.file)

    def reflect(self):
        reflect = self.image.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
        reflect.save(self.output_file)

    def flip(self):
        flip = self.image.transpose(Image.Transpose.FLIP_TOP_BOTTOM)
        flip.save(self.output_file)

    def grayScale(self):
        color_enhancer = ImageEnhance.Color(self.image)
        grayScale = color_enhancer.enhance(0) 
        grayScale.save(self.output_file)

    def find_edges(self):
        find_edges = self.image.filter(ImageFilter.FIND_EDGES)
        find_edges.save(self.output_file)

    def blur(self):
        blur = self.image.filter(ImageFilter.GaussianBlur(radius=5))
        blur.save(self.output_file)

    def emboss(self):
        emboss = self.image.filter(ImageFilter.EMBOSS)
        emboss.save(self.output_file)
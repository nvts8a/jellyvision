class RomanNumerals
  def parse(roman_numeral)
    return 0 unless roman_numeral
    roman_numeral.upcase!
    roman_numeral.delete!(" ")
    integer = 0
    
    firstDigitMap.each do |roman, int| 
      if integer < 1 && roman_numeral.include?(roman)
        roman_numeral.slice!(roman)
        integer += int
      end
    end
    
    secondDigitMap.each do |roman, int|
      if integer < 10 && roman_numeral.include?(roman)
        roman_numeral.slice!(roman)
        integer += int
      end
    end

    integer
  end

  def firstDigitMap
    {
      "I"    => 1,
      "II"   => 2,
      "III"  => 3,
      "IV"   => 4,
      "V"    => 5,
      "VI"   => 6,
      "VII"  => 7,
      "VIII" => 8,
      "IX"   => 9
    }.sort_by do |roman, int|
      -roman.length
    end
  end

  def secondDigitMap
    {
      "X"    => 10,
      "XX"   => 20,
      "XXX"  => 30,
      "XL"   => 40,
      "L"    => 50,
      "LX"   => 60,
      "LXX"  => 70,
      "LXXX" => 80,
      "XC"   => 90,
      "C"    => 100
    }.sort_by do |roman, int|
      -roman.length
    end
  end

  def test
    print "### TESTING CLASS RomanNumerals ###\n\n"

    # Singles
    print ( parse("I") == 1 ? "PASSED\n" : "FAILED\n" )
    print ( parse("III") == 3 ? "PASSED\n" : "FAILED\n" )
    print ( parse("IV") == 4 ? "PASSED\n" : "FAILED\n" )
    print ( parse("V") == 5 ? "PASSED\n" : "FAILED\n" )
    print ( parse("VI") == 6 ? "PASSED\n" : "FAILED\n" )
    print ( parse("VIII") == 8 ? "PASSED\n" : "FAILED\n" )
    print ( parse("IX") == 9 ? "PASSED\n" : "FAILED\n" )
    # Doubles
    print ( parse("X") == 10 ? "PASSED\n" : "FAILED\n" )
    print ( parse("XX") == 20 ? "PASSED\n" : "FAILED\n" )
    print ( parse("XL") == 40 ? "PASSED\n" : "FAILED\n" )
    print ( parse("L") == 50 ? "PASSED\n" : "FAILED\n" )
    print ( parse("LXX") == 70 ? "PASSED\n" : "FAILED\n" )
    print ( parse("XC") == 90 ? "PASSED\n" : "FAILED\n" )
    print ( parse("C") == 100 ? "PASSED\n" : "FAILED\n" )
    # Both
    print ( parse("XIX") == 19 ? "PASSED\n" : "FAILED\n" )
    print ( parse("XXXVI") == 36 ? "PASSED\n" : "FAILED\n" )
    print ( parse("XLIX") == 49 ? "PASSED\n" : "FAILED\n" )
    print ( parse("LV") == 55 ? "PASSED\n" : "FAILED\n" )
    print ( parse("XCIX") == 99 ? "PASSED\n" : "FAILED\n" )
    print ( parse("LXXXVIII") == 88 ? "PASSED\n" : "FAILED\n" )
    print ( parse("LXIV") == 64 ? "PASSED\n" : "FAILED\n" )
    print ( parse("CIX") == 109 ? "PASSED\n" : "FAILED\n" )
    # Scrubbing
    print ( parse("") == 0 ? "PASSED\n" : "FAILED\n" )
    print ( parse(nil) == 0 ? "PASSED\n" : "FAILED\n" )
    print ( parse("X I X") == 19 ? "PASSED\n" : "FAILED\n" )
    print ( parse("xxxvi") == 36 ? "PASSED\n" : "FAILED\n" )
    print ( parse("X l i X") == 49 ? "PASSED\n" : "FAILED\n" )
  end
end

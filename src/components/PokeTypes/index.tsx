import { getTypeIconSrc } from "@/utils";
import { Avatar, Box, IconButton } from "@mui/material";
import { changeColorChip } from "../PokeCard";
import { Type } from "@/types/pokemon";

interface PokeTypeProps {
  types: Type[]
}

const PokeTypes = ({ types }: PokeTypeProps) => {

  return (
    <>
      {
        types.map(type => {
          const typeImg = getTypeIconSrc(type.type.name);
          return (
            <Box mr={1} key={type.type.name}>
              <IconButton disabled style={{ background: changeColorChip(type.type.name) }}>
                <Avatar sx={{ height: 24, width: 24 }} alt={typeImg} src={typeImg} />
              </IconButton>
            </Box>
          )
        })
      }
    </>
  );
}

export default PokeTypes;